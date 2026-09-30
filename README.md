# MVP-First Product Design

让 AI 在拆功能、画页面、写代码之前，先判断产品为什么值得做，再收敛出能够验证核心价值的第一版。

**缩小范围，保住核心能力。**

这是一个面向 AI Agent 的产品设计 Skill，适用于 MVP 规划、PRD、原型设计、已有界面简化，以及早期产品的范围审查。完整规则位于 [SKILL.md](SKILL.md)，界面元数据位于 [agents/openai.yaml](agents/openai.yaml)。

## 为什么做这个 Skill

使用 AI 做产品时，很容易从一个想法直接跳到功能清单：加仪表盘、加设置、加动效，再把每个可能出现的边界情况都做成页面。

这个 Skill 把判断顺序固定下来：先解释真实问题、预期结果和用户动机，再决定哪些功能值得进入第一版；保留下来的核心流程必须真正完成任务。

## 它会检查什么

| 判断 | 需要回答的问题 |
| --- | --- |
| 功能前提 | 需求来自什么问题？哪些是证据，哪些只是猜测？ |
| 用户动机 | 用户在什么情境下会主动使用？为什么不继续用现有办法？ |
| 付费价值 | 涉及商业化时，用户为哪部分新增价值付费？ |
| 因果与优先级 | 功能如何改变行为、进而影响结果？最弱的假设是什么？ |
| 第一版范围 | 哪些保留、简化、推迟或删除？ |
| 核心能力 | 缩小范围后，是否仍然交付完整、可靠且有用的结果？ |
| 可观察收益 | 用什么信号判断投入值得？是否考虑维护成本？ |
| 交互完整性 | 每个可见控件是否有用？取消、反馈、完成和错误状态是否连贯？ |
| 现有产品一致性 | 是否复用已有视觉、导航和控件模式？ |
| 项目信息保护 | 通用规则是否夹带能够还原来源项目的细节？ |

## 使用方式

将整个 `mvp-first-product-design` 文件夹交给支持本地 Skill 的 Agent，按该客户端的技能安装方式安装。文件夹必须保留 `SKILL.md` 和 `agents/openai.yaml` 的相对位置。

如果你在 Codex 中已经有可用的个人 skills 目录，把完整文件夹放到同一目录中，并在客户端确认技能已被识别。不同客户端和版本的发现目录可能不同，按当前客户端文档操作，避免只复制 README。

Codex 的 Skill 支持 `SKILL.md` 指令文件及 `agents/openai.yaml` 元数据。结构与编写说明见 [OpenAI 官方文档](https://developers.openai.com/plugins/build/skills)。

识别后，在对话里明确调用：

```text
使用 $mvp-first-product-design 审查下面的产品想法。
先判断为什么值得做、用户为什么主动使用，再给出第一版范围。
将功能分成保留、简化、推迟、删除四类，并说明理由。
保住核心流程的完整性，不要靠削弱主要能力来缩小范围。

我的产品想法：……
目标用户：……
已经掌握的证据：……
时间与资源约束：……
```

没有 Skill 加载能力的聊天工具，也可以手动提供 `SKILL.md` 全文作为方法参考；这不等于客户端原生安装。

## 更多调用示例

### 只做需求评审

```text
使用 $mvp-first-product-design 评审下面的 PRD，只分析，不修改文件。
指出最弱的产品假设、应先验证的问题、必要前置能力和最小可信实验。
给出 Keep / Simplify / Defer / Remove 清单。
```

### 简化现有界面

```text
使用 $mvp-first-product-design 简化这个页面。
沿用现有设计系统，优先保留主任务、必要反馈和完整交互。
解释每项删减对任务完成的影响，并检查相关响应式及禁用状态。
```

### 审查商业化功能

```text
使用 $mvp-first-product-design 评审这项付费功能。
区分平台收入目标与用户购买动机，检查相对现有权益的新增价值。
不要把用户兴趣当成购买证据；不确定时给出最小验证方案。
```

## 预期产出

1. 功能前提判断，以及继续设计、先验证、先补前置能力或推迟的建议。
2. 核心用户、主任务、最短完整流程和待验证假设。
3. 保留 / 简化 / 推迟 / 删除清单及其依据。
4. 保留项的预期收益、可观察信号与总维护成本。
5. 必须守住的核心能力、必要质量和完整交互。
6. 暂不支持的范围、临时处理方式及重新评估的证据条件。

输出规模应匹配问题规模，小改动不需要生成长篇报告，也不应反复追问已有信息。

## 使用边界

- MVP 需要真实交付核心价值，不能用假按钮、断开的流程或明显降低质量来替代。
- 不应以精简为由删掉明确要求、必要权限保护或重要数据完整性约束。
- 成熟产品明确要求品牌表达、视觉打磨或发布质量时，应尊重这些要求。
- Skill 提供决策方法，不会凭空创造用户证据，也不保证商业成功。
- 当前发布材料保留原始规则，未附跨模型效果基准或量化效果承诺。

## 文件结构

```text
mvp-first-product-design/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── README.md
└── CHANGELOG.md
```

## English overview

An agent skill for requirement-led MVP planning and product design. It evaluates the feature premise, user motivation, willingness to pay when relevant, and observable benefits before decomposing a concept into features and screens.

The method classifies scope into Keep, Simplify, Defer, and Remove while preserving the strength and end-to-end integrity of the retained core. It also covers interaction integrity, existing design-system reuse, ownership cost, and protection of source-project information.

The complete English instructions are in [SKILL.md](SKILL.md).
