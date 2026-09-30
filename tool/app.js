'use strict';
const M = window.MVPReview;
let review = M.empty();
let dirty = false;
const el = id => document.getElementById(id);
const hints = {evidence:'把事实、教学设定和猜测分开写；未知也可以写出来。',payment:'不涉及商业化可以写“不适用”。',core:'缩减范围后，这个结果仍然必须真实交付。',experiment:'写已有基线、测量窗口与会改变决定的信号；缺少数据时不要编造。'};
function field(key, area) {
  const label = document.createElement('label');
  label.textContent = M.labels[key];
  if (['title','evidence','core','flow','experiment'].includes(key)) label.className = 'wide';
  if (hints[key]) {const hint = document.createElement('small'); hint.textContent = hints[key]; label.appendChild(hint);}
  const control = document.createElement(key === 'title' ? 'input' : 'textarea');
  control.id = key;
  control.name = key;
  control.maxLength = 8000;
  if (key === 'title') control.type = 'text';
  else control.rows = 3;
  control.value = review[key];
  control.addEventListener('input', () => {review[key] = control.value; dirty = true; refresh();});
  label.appendChild(control); el(area).appendChild(label);
}
['title','user','problem','evidence','outcome','motivation','payment','constraints'].forEach(key => field(key,'premise-fields'));
['core','flow','quality'].forEach(key => field(key,'core-fields'));
['experiment','boundaries','reopen'].forEach(key => field(key,'verify-fields'));
function status(message) {el('status').textContent = message;}
function features() {
  el('features').replaceChildren();
  review.features.forEach((feature, index) => {
    const card = document.createElement('div'); card.className = 'feature';
    const grid = document.createElement('div'); grid.className = 'feature-grid';
    const labels = {name:'功能名称',decision:'取舍决定',reason:'需求依据与收益',signal:'观察信号 / 必要结果',cost:'建设及维护成本'};
    Object.keys(labels).forEach(key => {
      const label = document.createElement('label'); label.textContent = labels[key];
      if (key === 'reason') label.className = 'wide';
      let control;
      if (key === 'decision') {
        control = document.createElement('select');
        M.decisions.forEach(decision => {const option = document.createElement('option'); option.value = decision; option.textContent = decision; control.appendChild(option);});
      } else {control = document.createElement(key === 'name' ? 'input' : 'textarea'); control.maxLength = 8000; if (key === 'name') control.type = 'text'; else control.rows = 2;}
      control.value = feature[key];
      control.addEventListener(key === 'decision' ? 'change' : 'input', () => {feature[key] = control.value; dirty = true; refresh();});
      label.appendChild(control); grid.appendChild(label);
    });
    card.appendChild(grid);
    const bottom = document.createElement('div'); bottom.className = 'feature-bottom';
    const checkLabel = document.createElement('label'); checkLabel.className = 'checkbox';
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = feature.core;
    checkbox.addEventListener('change', () => {feature.core = checkbox.checked; dirty = true; refresh();});
    checkLabel.append(checkbox, document.createTextNode('核心能力：删除会影响承诺结果'));
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove'; remove.textContent = '删除这一项';
    remove.addEventListener('click', () => {
      if (!window.confirm('删除“' + (feature.name || '未命名功能') + '”及其填写信息？此操作无法撤销。')) return;
      review.features.splice(index,1); dirty = true; features(); refresh(); status('已删除该功能条目。');
    });
    bottom.append(checkLabel,remove); card.appendChild(bottom); el('features').appendChild(card);
  });
  el('add-feature').disabled = review.features.length >= 60;
}
function refresh() {
  el('counts').replaceChildren();
  const chinese = {Keep:'保留',Simplify:'简化',Defer:'推迟',Remove:'删除'};
  M.decisions.forEach(decision => {
    const count = document.createElement('div'); count.className = 'count';
    const number = document.createElement('strong'); number.textContent = String(review.features.filter(f => f.decision === decision).length);
    count.append(number,document.createTextNode(chinese[decision] + ' / ' + decision)); el('counts').appendChild(count);
  });
  el('notes').replaceChildren();
  const notes = M.inspect(review);
  if (!notes.length) notes.push('当前检查项已填写，仍需根据证据验证判断。');
  notes.forEach(note => {const li = document.createElement('li'); li.textContent = note; el('notes').appendChild(li);});
  el('preview').value = M.markdown(review);
}
function replace(next) {
  review = M.normalize(next);
  M.fields.forEach(key => el(key).value = review[key]);
  el('disposition').value = review.disposition;
  dirty = true; features(); refresh();
}
el('review-form').addEventListener('submit', event => event.preventDefault());
el('disposition').addEventListener('change', () => {review.disposition = el('disposition').value; dirty = true; refresh();});
el('add-feature').addEventListener('click', () => {
  if (review.features.length >= 60) return;
  review.features.push({name:'',decision:'Defer',core:false,reason:'',signal:'',cost:''}); dirty = true; features(); refresh();
  el('features').lastElementChild.querySelector('input').focus();
});
el('load-example').addEventListener('click', () => {
  if (dirty && !window.confirm('载入示范将替换当前内容。请先导出 JSON 保存，需要继续吗？')) return;
  replace(M.example()); status('已载入虚构教学示范；其中的证据和资源设定不是实际业务数据。');
});
el('import-json').addEventListener('click', () => el('file').click());
el('file').addEventListener('change', async () => {
  const file = el('file').files[0]; if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error('文件超过 1 MiB，请确认使用的是本工具导出的 JSON。');
    const next = M.normalize(JSON.parse(await file.text()));
    if (dirty && !window.confirm('导入将替换当前内容。请先保存当前评审，需要继续吗？')) return;
    replace(next); status('已导入评审。所有内容仍仅在当前页面中。');
  } catch (error) {status('导入失败：' + error.message + '。当前评审未被替换。');}
  finally {el('file').value = '';}
});
function download(content, extension, type) {
  const url = URL.createObjectURL(new Blob([content],{type}));
  const link = document.createElement('a'); link.href = url; link.download = 'mvp-review.' + extension;
  document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
  status('已发起文件下载，请确认浏览器下载完成。JSON 可重新导入，Markdown 用于阅读与讨论。');
}
el('export-md').addEventListener('click', () => download(M.markdown(review),'md','text/markdown;charset=utf-8'));
el('export-json').addEventListener('click', () => download(JSON.stringify(M.normalize(review),null,2),'json','application/json'));
window.addEventListener('beforeunload', event => {if (dirty) {event.preventDefault(); event.returnValue = '';}});
features(); refresh();
