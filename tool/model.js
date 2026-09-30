(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MVPReview = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  const fields = ['title', 'user', 'problem', 'evidence', 'outcome', 'motivation', 'payment', 'constraints', 'core', 'flow', 'quality', 'experiment', 'boundaries', 'reopen'];
  const labels = {title:'评审名称',user:'目标用户与情境',problem:'当前问题与做法',evidence:'已有证据与未知项',outcome:'主要结果与观察信号',motivation:'主动使用动机',payment:'付费新增价值（如适用）',constraints:'资源与明确要求',core:'必须交付的核心结果',flow:'最短完整流程',quality:'必要质量与保护',experiment:'验证方法与测量窗口',boundaries:'暂不支持的范围及处理方式',reopen:'重开推迟项的证据条件'};
  const decisions = ['Keep', 'Simplify', 'Defer', 'Remove'];
  const featureFields = ['name', 'decision', 'reason', 'signal', 'cost'];
  function text(value, name) {
    if (typeof value !== 'string') throw new Error(name + ' 必须是文本');
    if (value.length > 8000) throw new Error(name + ' 过长（最多 8000 字符）');
    return value;
  }
  function empty() {
    const review = {schemaVersion:1, disposition:'validate', features:[]};
    fields.forEach(key => review[key] = '');
    return review;
  }
  function normalize(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input) || input.schemaVersion !== 1) throw new Error('不支持的评审格式，需要 schemaVersion: 1');
    const review = empty();
    fields.forEach(key => review[key] = text(input[key] === undefined ? '' : input[key], labels[key]));
    if (!['proceed','validate','prerequisite','defer'].includes(input.disposition)) throw new Error('前提决定无效');
    review.disposition = input.disposition;
    if (!Array.isArray(input.features) || input.features.length > 60) throw new Error('功能列表必须是数组，最多 60 项');
    review.features = input.features.map((feature, index) => {
      if (!feature || typeof feature !== 'object' || Array.isArray(feature)) throw new Error('功能 ' + (index + 1) + ' 格式无效');
      const result = {};
      featureFields.forEach(key => result[key] = text(feature[key] === undefined ? '' : feature[key], '功能 ' + (index + 1) + ' ' + key));
      if (!decisions.includes(result.decision)) throw new Error('功能 ' + (index + 1) + ' 取舍无效');
      if (typeof feature.core !== 'boolean') throw new Error('功能核心标记必须为布尔值');
      result.core = feature.core;
      return result;
    });
    return review;
  }
  function inspect(review) {
    const notes = [];
    if (!review.evidence.trim()) notes.push('还没有记录证据。未知项可以明确写出，不要用假设替代事实。');
    if (!review.core.trim() || !review.flow.trim()) notes.push('请说明核心承诺和完整流程，避免只留下局部演示。');
    if (!review.outcome.trim() || !review.experiment.trim()) notes.push('请记录可观察结果及验证方法，再判断范围是否合适。');
    review.features.forEach((feature, i) => {
      const name = feature.name.trim() || '第 ' + (i + 1) + ' 项';
      if (feature.core && ['Defer','Remove'].includes(feature.decision)) notes.push(name + ' 被标为核心但又推迟或删除，请检查是否破坏承诺结果。');
      if (['Keep','Simplify'].includes(feature.decision) && (!feature.reason.trim() || !feature.signal.trim() || !feature.cost.trim())) notes.push(name + ' 需要补充依据、观察信号或建设及维护成本。');
    });
    if (review.features.some(f => f.decision === 'Defer') && !review.reopen.trim()) notes.push('已推迟部分功能，请说明什么证据会让你重新评估。');
    return notes;
  }
  const dispositionLabels = {proceed:'继续分解',validate:'先验证最弱假设',prerequisite:'先补前置能力',defer:'推迟'};
  function markdown(review) {
    const r = normalize(review);
    const escapeCell = value => value.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
    const lines = ['# MVP 评审：' + (r.title || '未命名').replace(/\r?\n/g,' '), '', '> 本报告由用户填写，工具只整理信息并提示缺项，不代表已验证的产品结论。', '', '## 输入与核心契约', ''];
    fields.filter(key => key !== 'title').forEach(key => { lines.push('### ' + labels[key], '', r[key].trim() || '未填写', ''); });
    lines.push('## 前提决定', '', dispositionLabels[r.disposition], '', '## 功能取舍', '', '| 项目 | 决定 | 核心 | 依据 | 信号 | 建设及维护成本 |', '| --- | --- | --- | --- | --- | --- |');
    r.features.forEach(f => lines.push('| ' + [f.name || '未命名',f.decision,f.core ? '是' : '否',f.reason,f.signal,f.cost].map(escapeCell).join(' | ') + ' |'));
    const notes = inspect(r);
    lines.push('', '## 待核对事项', '');
    if (notes.length) notes.forEach(note => lines.push('- ' + note));
    else lines.push('当前已填写检查项。信息完整不等于产品假设成立，仍需验证。');
    return lines.join('\n') + '\n';
  }
  function example() {
    const r = empty();
    Object.assign(r, {
      title:'社区维修预约（虚构示范）', user:'一个社区的居民和一个维修团队',
      problem:'现有消息预约需要反复补充信息；居民不清楚是否被受理。',
      evidence:'教学设定：信息不完整、确认不明确。没有真实访谈或数据；会员付费意愿未知。',
      outcome:'有效请求能得到明确确认或调整；观察信息完整率、确认耗时、预约完成比例。',
      motivation:'居民需要维修，希望一次提交并知道什么时候有人来。',
      payment:'维修按现有方式结算；没有证据说明居民愿为预约工具付会员费。',
      constraints:'教学设定：两名开发、四周试做、一个服务团队与一个区域。',
      core:'居民提交有效请求，工作人员承接，居民看到明确处理结果。',
      flow:'填写问题与联系信息 → 提交回执 → 工作人员确认或调整 → 居民看到结果。',
      quality:'请求不丢失、时间语义清楚、只能访问自己的请求、重试不重复创建。',
      experiment:'先记录现有追问次数和受理时间；小团队试做两周。未设定无依据的成功数值。',
      boundaries:'首版一个团队；复杂协商人工处理，照片按需人工索取，沿用已有结算。',
      reopen:'缺照片反复阻塞预约时评估上传；人工改期成为主要瓶颈时评估自动化。',
      disposition:'validate',
      features:[
        {name:'必要信息提交',decision:'Keep',core:true,reason:'完成有效预约请求',signal:'首次信息完整率',cost:'字段验证、提交重试和数据维护'},
        {name:'预约结果与工作人员确认',decision:'Keep',core:true,reason:'保证提交能被承接',signal:'受理时间和明确结果比例',cost:'状态记录、处理列表和权限'},
        {name:'聊天',decision:'Simplify',core:false,reason:'复杂协商先人工处理',signal:'人工协调是否阻塞完成',cost:'显示结果与联系方法'},
        {name:'照片上传',decision:'Defer',core:false,reason:'需要时人工索取，先观察需求',signal:'缺照片导致的阻塞',cost:'暂不建设上传系统'},
        {name:'主题皮肤',decision:'Remove',core:false,reason:'与预约完成无已知联系',signal:'无',cost:'无'}
      ]
    });
    return r;
  }
  return {fields,labels,decisions,empty,normalize,inspect,markdown,example};
});
