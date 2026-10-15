import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const valid = (condition, message) => { if (!condition) throw new Error(message); };
const text = value => typeof value === 'string' && value.trim().length > 0;
const unique = values => new Set(values).size === values.length;
const verdicts = ['pass', 'fail', 'uncertain', 'na'];
const types = ['string','number','integer','boolean','array','object','null'];
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const matchesType = (value, type) => type === 'null' ? value === null : type === 'array' ? Array.isArray(value) : type === 'object' ? object(value) : type === 'integer' ? Number.isInteger(value) : type === 'number' ? typeof value === 'number' && Number.isFinite(value) : typeof value === type;

function validateContract(c) {
  valid(object(c) && ['text','object'].includes(c.type), 'Declare an outputContract: text or object');
  const lengthRules = rule => {
    for(const key of ['minLength','maxLength']) if(rule[key] !== undefined) valid(Number.isInteger(rule[key]) && rule[key]>=0, 'Invalid length rule');
    valid(rule.minLength === undefined || rule.maxLength === undefined || rule.minLength<=rule.maxLength, 'Conflicting length rules');
  };
  const allowed=(rule,keys)=>valid(Object.keys(rule).every(key=>keys.includes(key)),'Unsupported contract keyword');
  if(c.type==='text') {allowed(c,['type','minLength','maxLength','nonBlank']);lengthRules(c);if(c.nonBlank!==undefined) valid(typeof c.nonBlank==='boolean','Invalid nonBlank');return;}
  allowed(c,['type','properties','required','additionalProperties']);
  valid(object(c.properties) && Array.isArray(c.required) && unique(c.required) && c.required.every(k=>text(k)&&Object.hasOwn(c.properties,k)) && typeof c.additionalProperties==='boolean','Invalid object contract');
  for(const rule of Object.values(c.properties)) {
    valid(object(rule)&&types.includes(rule.type),'Invalid property type');
    allowed(rule,['type','minLength','maxLength','nonBlank','enum']);lengthRules(rule);
    if(rule.nonBlank!==undefined) valid(rule.type==='string' && typeof rule.nonBlank==='boolean','Invalid nonBlank');
    valid((rule.minLength===undefined&&rule.maxLength===undefined)||rule.type==='string','Length requires string');
    if(rule.enum!==undefined) valid(Array.isArray(rule.enum)&&rule.enum.length>0&&rule.enum.every(v=>v===null||['string','number','boolean'].includes(typeof v))&&rule.enum.every(v=>matchesType(v,rule.type)),'Invalid enum');
  }
}

export function checkOutput(contract, output) {
  validateContract(contract);
  const lengthOk=(value,rule)=> (!rule.nonBlank||text(value))&&(rule.minLength===undefined||value.length>=rule.minLength)&&(rule.maxLength===undefined||value.length<=rule.maxLength);
  if(contract.type==='text') return typeof output==='string' && lengthOk(output,contract);
  if(!object(output)||!contract.required.every(key=>Object.hasOwn(output,key))) return false;
  if(!contract.additionalProperties && Object.keys(output).some(key=>!Object.hasOwn(contract.properties,key))) return false;
  return Object.entries(contract.properties).every(([key,rule])=>!Object.hasOwn(output,key)||(
    matchesType(output[key],rule.type) && (rule.type!=='string'||lengthOk(output[key],rule)) &&
    (rule.enum===undefined||rule.enum.includes(output[key]))));
}

function evidenceText(value) {
  if(typeof value==='string') return value;
  if(value===undefined) return '';
  return JSON.stringify(value);
}

export function validateSuite(s) {
  valid(s?.schemaVersion === 1 && text(s.id) && text(s.version), 'Invalid suite identity');
  validateContract(s.outputContract);
  valid(Array.isArray(s.dimensions) && s.dimensions.length > 0, 'Missing dimensions');
  valid(unique(s.dimensions.map(d => d.id)), 'Duplicate dimensions');
  for (const d of s.dimensions) valid(text(d.id) && typeof d.critical === 'boolean' && text(d.pass) && text(d.fail), 'Invalid dimension');
  valid(Array.isArray(s.cases) && s.cases.length > 0 && unique(s.cases.map(c => c.id)), 'Empty/duplicate cases');
  const families = new Map();
  for (const c of s.cases) {
    valid(['id', 'family', 'language', 'source', 'input', 'expected'].every(k => text(c[k])), 'Missing case field');
    valid(['dev', 'holdout'].includes(c.split) && ['historical', 'adapted', 'synthetic'].includes(c.origin), 'Invalid split/origin');
    valid(Array.isArray(c.dimensions) && c.dimensions.length > 0 && unique(c.dimensions) && c.dimensions.every(id => s.dimensions.some(d => d.id === id)), 'Invalid case dimensions');
    valid(!families.has(c.family) || families.get(c.family) === c.split, 'Family leaks across dev/holdout');
    families.set(c.family, c.split);
  }
  return s;
}

export function prepare(s, id) {
  validateSuite(s); valid(text(id), 'Missing run ID');
  return { schemaVersion: 1, id, suiteId: s.id, suiteVersion: s.version,
    metadata: { kind: 'synthetic', model: 'unknown', promptVersion: 'unknown', parameters: {} },
    samples: s.cases.map(c => ({ caseId: c.id, sampleId: '1', status: 'not_run', output: null, reviews: {} })) };
}

export function validateRun(s, r) {
  validateSuite(s);
  valid(r?.schemaVersion === 1 && text(r.id) && r.suiteId === s.id && r.suiteVersion === s.version, 'Run/suite identity mismatch');
  valid(r.metadata && ['historical','live','synthetic'].includes(r.metadata.kind) && text(r.metadata.model) && text(r.metadata.promptVersion) && r.metadata.parameters && typeof r.metadata.parameters === 'object' && !Array.isArray(r.metadata.parameters), 'Invalid run metadata');
  valid(Array.isArray(r.samples), 'Missing samples');
  valid(unique(r.samples.map(x => JSON.stringify([x.caseId,x.sampleId]))), 'Duplicate sample');
  for (const x of r.samples) {
    const c = s.cases.find(c => c.id === x.caseId);
    valid(c && text(x.sampleId) && ['not_run','ok','error'].includes(x.status), 'Unknown case/status');
    valid(x.reviews && typeof x.reviews === 'object' && !Array.isArray(x.reviews), 'Invalid reviews');
    if (x.status !== 'ok') { valid(Object.keys(x.reviews).length === 0, 'Unrun/error cannot have reviews'); continue; }
    // Malformed generated output is a recorded model/format failure, not a corrupt run file.
    const outputText = evidenceText(x.output);
    const rawStrings = [];
    const collect = value => {if(typeof value==='string') rawStrings.push(value);else if(value&&typeof value==='object') Object.values(value).forEach(collect);};
    collect(x.output);
    for (const [id, review] of Object.entries(x.reviews)) {
      valid(c.dimensions.includes(id), 'Review outside case dimensions');
      valid(verdicts.includes(review.verdict) && text(review.reason) && text(review.reviewer), 'Invalid review');
      if (['pass','fail'].includes(review.verdict)) valid(text(review.evidence) && [outputText,...rawStrings].some(t=>t.includes(review.evidence)), 'Evidence must quote actual output');
    }
  }
  return r;
}

export function report(s, r) {
  validateRun(s,r);
  const counts = { ok:0, error:0, not_run:0, formatFailures:0, pass:0, fail:0, uncertain:0, na:0, pending:0 };
  const byDimension = Object.fromEntries(s.dimensions.map(d => [d.id,{pass:0,fail:0,uncertain:0,na:0,pending:0}]));
  const failures = [], observed = new Set();
  for (const x of r.samples) {
    observed.add(x.caseId); counts[x.status]++;
    if (x.status !== 'ok') continue;
    const formatOk = checkOutput(s.outputContract, x.output);
    if (!formatOk) { counts.formatFailures++; failures.push({caseId:x.caseId,sampleId:x.sampleId,dimension:'format',critical:true}); }
    const c = s.cases.find(c => c.id === x.caseId);
    for (const id of c.dimensions) {
      const review = x.reviews[id]; const v = review?.verdict || 'pending';
      counts[v]++; byDimension[id][v]++;
      if(v === 'fail') failures.push({caseId:x.caseId,sampleId:x.sampleId,dimension:id,critical:s.dimensions.find(d=>d.id===id).critical,...review});
    }
  }
  const missingCases=s.cases.filter(c=>!observed.has(c.id)).map(c=>c.id);
  const applicable = counts.pass+counts.fail+counts.uncertain+counts.pending;
  const decision=counts.error||counts.formatFailures||counts.fail ? 'blocked' : missingCases.length||counts.not_run||counts.pending||counts.uncertain||!applicable ? 'incomplete' : 'reviewed_pass';
  return {suiteId:s.id,suiteVersion:s.version,runId:r.id,kind:r.metadata.kind,decision,
    caseCoverage:{observed:observed.size,total:s.cases.length,missingCases},counts,byDimension,failures,
    semanticPassFraction:{numerator:counts.pass,denominator:counts.pass+counts.fail},
    note:'人工语义评审汇总；格式通过不代表语义通过；历史/合成结果不代表当前模型。未评与运行错误单列，不计作通过。'};
}

export function compare(s, before, after) {
  validateRun(s,before); validateRun(s,after);
  const flatten = r=>new Map(r.samples.filter(x=>x.status==='ok').flatMap(x=>Object.entries(x.reviews).map(([d,v])=>[JSON.stringify([x.caseId,x.sampleId,d]),v.verdict])));
  const a=flatten(before),b=flatten(after); const pairs={improved:0,regressed:0,unchanged:0,unresolved:0,unpaired:0};
  const changes=[];
  for(const key of new Set([...a.keys(),...b.keys()])) {
    const av=a.get(key),bv=b.get(key); let state;
    if(!av||!bv) state='unpaired';
    else if(!['pass','fail'].includes(av)||!['pass','fail'].includes(bv)) state='unresolved';
    else state=av===bv?'unchanged':bv==='pass'?'improved':'regressed';
    pairs[state]++; if(state!=='unchanged') changes.push({key:JSON.parse(key),before:av??null,after:bv??null,state});
  }
  const ordered = value => Array.isArray(value) ? value.map(ordered) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key=>[key,ordered(value[key])])) : value;
  const canonical = value => JSON.stringify(ordered(value));
  const controlled=before.metadata.model!=='unknown' && before.metadata.model===after.metadata.model && canonical(before.metadata.parameters)===canonical(after.metadata.parameters) && before.metadata.promptVersion!=='unknown' && after.metadata.promptVersion!=='unknown';
  return {pairs,changes,conditions:controlled?'可控条件待人工核对':'mixed',before:report(s,before),after:report(s,after),note:'配对结果不证明因果；还需核对输入、资料、顺序、评审者及采样条件。'};
}

async function read(path) { return JSON.parse((await readFile(path,'utf8')).replace(/^\uFEFF/,'')); }
async function main() {
  const [cmd, ...args] = process.argv.slice(2); const oi=args.indexOf('--out');
  let out; if(oi>=0){out=args[oi+1];valid(text(out),'Missing --out path');args.splice(oi,2);}
  valid(['validate','prepare','report','compare'].includes(cmd),'Use validate|prepare|report|compare (see references/tool-contract.md)');
  const s=validateSuite(await read(args[0])); let result;
  if(cmd==='validate') {valid(args.length===1,'Unexpected arguments');result={valid:true,cases:s.cases.length,dimensions:s.dimensions.length};}
  if(cmd==='prepare') {valid(args.length===3&&args[1]==='--run','prepare suite --run id');result=prepare(s,args[2]);}
  if(cmd==='report') {valid(args.length===2,'report suite run');result=report(s,await read(args[1]));}
  if(cmd==='compare') {valid(args.length===3,'compare suite before after');result=compare(s,await read(args[1]),await read(args[2]));}
  const content=JSON.stringify(result,null,2)+'\n';
  if(out) await writeFile(out,content,{encoding:'utf8',flag:'wx'}); else process.stdout.write(content);
  const decision=result.after?.decision||result.decision;
  process.exitCode=decision==='blocked'?1:decision==='incomplete'?3:0;
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) main().catch(error=>{console.error(error.message);process.exitCode=2;});
