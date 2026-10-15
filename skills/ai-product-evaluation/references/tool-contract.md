# 离线工具契约

需要 Node.js 22 或更新版本，无额外依赖。在 skill 目录运行：

```powershell
node scripts/eval.mjs validate <suite.json>
node scripts/eval.mjs prepare <suite.json> --run <run-id> --out <new-run.json>
node scripts/eval.mjs report <suite.json> <run.json> --out <report.json>
node scripts/eval.mjs compare <suite.json> <before.json> <after.json>
node --test scripts/eval.test.mjs
```

不带 out 输出到终端；带 out 时只创建新文件，拒绝覆盖。prepare 只生成待填记录，不发送请求。输出文件可能包含实际对话，保留在项目私有目录，不直接分享。

suite：`schemaVersion:1, id, version, outputContract, dimensions:[{id,critical,pass,fail}], cases:[{id,family,split,language,origin,source,input,expected,dimensions}]`。split 仅 dev/holdout；origin 仅 historical/adapted/synthetic。source 与 input 为非空字符串。任务资料和多轮原文可合并进 input；模型调用方仍应保留独立原始请求文件。工具强制不同 split 不能共享 family，但无法自动发现语义近似泄漏。

每个项目自行声明 outputContract，没有默认群聊字段。纯文本使用 `{"type":"text","nonBlank":true}`，可加 minLength/maxLength。顶层对象使用 `{"type":"object","properties":{"answer":{"type":"string","nonBlank":true}},"required":["answer"],"additionalProperties":false}`。properties 的字段规则支持 type（string/number/integer/boolean/array/object/null）、字符串长度、nonBlank 和标量 enum。该契约是小型格式检查器，不是完整 JSON Schema：不支持嵌套属性或数组元素约束等关键字，遇到未知关键字报错而不是忽略。复杂格式需扩展适配，不能默认已验证。

群聊项目可把 action/dialogue 和相应长度限制放在其 suite；提取项目可以声明 total/currency；摘要或代码文本使用 text。项目判据、限额与证据始终保存在项目包中，不进入通用脚本。仅调整描述性格式声明而不改变原判据时可补入既有套件；任何实质输出或评测口径变化须升 suite 版本并重新评审，不跨版本复用通过结论。

run：`schemaVersion:1, id, suiteId, suiteVersion, metadata:{kind,model,promptVersion,parameters}, samples:[]`。kind 为 historical/live/synthetic。samples 每项有 `caseId,sampleId,status,output,reviews`。status 为 not_run/ok/error；ok 的 output 按项目 outputContract 保存为字符串或对象，reviews 为维度 ID 到 `{verdict,evidence,reason,reviewer}` 的映射。verdict 为 pass/fail/uncertain/na；每条必须有非空 reason/reviewer；pass/fail 的 evidence 必须是 output 字符串值或 JSON 序列化结果的原文子串。输入侧或图片侧证据写入 reason 并保留源路径，无法直接判定时用 uncertain。metadata 缺版本写 unknown，不伪造。

输入格式只检查结构，语义仍依赖人工。run 可只包含套件的一部分；report 会把其余计为未覆盖。not_run 与 error 不进入语义通过率分母；单独统计且不允许整体通过。未填写维度为 pending。na 从适用分母排除但单独报告。

report 决策为：存在格式问题、error 或任何 fail 时 blocked；有缺失/pending/uncertain/not_run 或没有适用已评项时 incomplete；否则 reviewed_pass。后者只表示当前记录的套件被评为通过，不是上线许可。report/compare 将 blocked 返回码 1，输入非法返回 2，incomplete 返回 3，reviewed_pass 返回 0。

compare 仅在两份 run 的 model/parameters 相同且 promptVersion 有记录时标记“可控条件待人工核对”，否则标记 mixed；它仍不证明因果。只配对相同 caseId/sampleId 的维度 verdict，不对缺失记录补零；输出改善、退化、未定和未配对数量。跨 suite 版本拒绝比较。
