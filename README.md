# MVP First Product Design

用于产品需求判断、MVP 范围收敛和 AI 质量评测的 Skill 集合。重点是持续打磨判断方法、评测标准和实际使用效果，不提供网页工作台。

## 两个 Skill

### MVP First Product Design

[完整指令](SKILL.md)

先判断需求为什么值得做、用户为什么会使用，再确定第一版保留什么。

- 区分真实问题、已有证据和未验证假设。
- 将需求分为保留、简化、延期和删除。
- 缩小功能范围，但不削弱核心能力和完整流程。
- 为重要改动明确可观察收益与维护成本。

适用于产品想法评审、PRD、MVP 规划和已有方案的范围审查。

### AI Product Evaluation

[完整指令](skills/ai-product-evaluation/SKILL.md)

判断 AI 哪里做得不好、原因是否有证据，以及修改后有没有改善。

- 按项目定义成功判据和不可牺牲的边界。
- 建立固定案例、正常对照和近邻反例。
- 结合实际输入输出分析 Bad Case，区分症状与原因假设。
- 对比前后版本，记录改善、退化、缺失和不确定。
- 将结论回流到产品研发和 Skill 更新。

这是跨项目方法，不绑定群聊或某一种模型。每个项目保留自己的判据、输出契约、案例和证据，不继承其他项目的通过结论。

## 如何使用

两个 Skill 独立使用，也可以配合：先明确核心价值和范围，再评估是否真正交付。

```text
使用 $mvp-first-product-design 评审下面的需求。
明确用户问题、已有证据和第一版范围，保留核心能力。

使用 $ai-product-evaluation 为这个项目制定评测标准和案例集。
根据实际输出分析 Bad Case，说明原因证据、最小修改和回归方法。
未运行、未评和不确定的内容不要记为通过。
```

按所用 Agent 的技能安装方式操作：MVP Skill 位于仓库根目录，评测 Skill 位于 `skills/ai-product-evaluation/`。分别保留各自 `SKILL.md` 及其相对资源路径；安装一个不代表另一个自动加载。

## 参考材料

- [MVP 评审模板](templates/review.md)
- [虚构需求评审案例](examples/repair-appointments.md)
- [MVP 行为评估输入](evals/README.md)
- [AI 评测协议](skills/ai-product-evaluation/references/protocol.md)
- [评测记录格式与辅助脚本](skills/ai-product-evaluation/references/tool-contract.md)
- [字段提取合成示例](examples/ai-evaluation/receipt-extraction/使用说明.md)

评测 Skill 附带离线记录校验与比较脚本，用于检查数据和汇总评审，不代替语义判断。测试命令：

```sh
node --test skills/ai-product-evaluation/scripts/eval.test.mjs
```

## 当前边界

这些 Skill 仍在迭代。案例与脚本测试不能证明模型效果，更不能保证商业成功。没有足够的跨场景对照证据时，不宣称方法已经稳定有效。

欢迎反馈具体输入、预期行为、实际输出和复现条件；不要提交项目密钥、真实用户资料或其他敏感信息。

[MIT License](LICENSE)
