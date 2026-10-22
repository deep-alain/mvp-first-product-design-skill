---
name: mvp-first-product-design
description: Assess product value, scope the smallest complete experience, and deliver usable UI/UX with evidence of what works. Use for MVP planning, PRDs, demo iteration, UI/UX design settings, prototype delivery, and reviews of incomplete or overdesigned early products. Preserve core quality, explicit visual direction, and existing product patterns; distinguish simulated behavior from verified capability.
---

# MVP-First Product Design

Design the smallest coherent first version that can validate the product's central user behavior. Treat visual restraint as a scope decision, not as an aesthetic preference.

Read [UI/UX decisions](references/uiux.md) when designing or changing a user-facing flow. Read [delivery and verification](references/delivery.md) when implementing, reviewing a runnable demo, or handing off artifacts. Use [the review template](templates/review.md) selectively; do not turn a small fix into a full discovery exercise.

## Protect the source project

Treat this skill as a reusable decision method, never as a record of the project from which an insight was learned. Keep project-specific context in that project's conversation or artifacts, not in the skill.

When updating this skill, do not include or preserve:

- product, company, feature, character, or internal code names;
- screenshots, copied interface labels, distinctive screen sequences, or exact field sets;
- proprietary workflows, business rules, pricing or entitlement details, data models, architecture, or operational limits;
- exact project metrics, thresholds, budgets, roadmap decisions, or unresolved incidents; or
- examples whose combined details could identify or reconstruct the source product.

Convert a useful observation into a domain-neutral decision criterion at least one level more abstract than the source. Prefer no example; when an example is necessary, make it synthetic and change multiple identifying dimensions rather than merely renaming entities. Do not state or imply which project produced a rule.

Before saving a skill update, perform a re-identification check: using the skill alone, could a reader infer the source project's domain, feature set, interface structure, monetization model, technical design, current problems, or roadmap? If so, remove or generalize the revealing information. When applying the skill to a user's current project, use that context only for the requested deliverable and do not write it back into the reusable skill unless the user explicitly requests a generalized rule.

## Judge the feature premise before decomposition

Before decomposing a proposed feature into requirements, flows, screens, or implementation, make a brief premise assessment. Reuse established conversation context; do not turn this into a repeated questionnaire or reopen settled decisions. Scale the assessment to the decision: a small fix can need only a sentence, while a new product capability needs explicit reasoning.

Establish:

- **Origin and problem:** What observed user problem or business constraint prompted this idea? Distinguish evidence, user-stated goals, and assumptions. Competitor adoption or the existence of a monetization mechanism does not establish a need.
- **Intended outcome:** Which primary outcome should improve, for which users, and why does it matter now? Specify a meaningful metric or required observable outcome, with baseline, direction, measurement window, and guardrails where available. Do not invent targets or equate feature usage with product success.
- **Voluntary use:** In what concrete situation does the user encounter the need, what triggers action, what result do they expect, and why would they actively choose this feature over their current behavior or doing nothing? Separate user motivation from the platform's desire for engagement or revenue.
- **Willingness to pay, when relevant:** What incremental value would the user pay for compared with free alternatives, existing entitlements, and their current workaround? Distinguish interest, usage, and actual purchase evidence. Do not assume that gating an existing benefit creates new value, or force a payment rationale onto a noncommercial feature.
- **Causal path and priority:** Explain how the delivered value could change user behavior and then the intended outcome. Identify the weakest assumption, prerequisite capabilities, potential displacement of existing usage or revenue, and whether a more fundamental improvement deserves priority. Treat ecosystem changes as hypotheses requiring explicit changes in participant incentives and behavior.

Conclude with a reasoned disposition: proceed to decomposition, validate the weakest assumption first, prioritize a prerequisite or alternative, or defer. For an uncertain premise, propose the smallest credible test and the evidence that would change the decision; do not fill the uncertainty with a larger feature specification. If the user explicitly requests a design despite uncertainty, proceed within that scope and label the premise as unvalidated rather than withholding the requested work.

Present the assessment in plain language before the feature breakdown: why this exists, what should improve, why users would use it or pay, and what evidence supports the next step. This is a decision method, not a software subsystem to add to the product.

## Start from the requirement

Before proposing screens or components, establish:

- the primary user and the one job they must complete;
- the shortest end-to-end flow that completes that job;
- the product assumption this version must validate;
- the expected benefit of each material change and how it can be observed;
- explicit requirements, constraints, and non-goals; and
- the existing platform patterns that should be reused.

If any of these are already available in the conversation or product, use them instead of reopening discovery.

Choose the cheapest credible test medium before building: an existing tool, manual service, or constrained prototype may test the assumption. Honor an explicit implementation request while stating what the chosen medium can establish. When revising an existing demo, inspect its current behavior and feedback before proposing a replacement. Separate user-confirmed requirements, observed behavior, reported-but-unverified results, and new hypotheses. Prefer current explicit instructions over older decisions; do not silently promote a previous assistant suggestion into a requirement.

## Decide what belongs in version one

For every proposed element, ask: **What user action, required state, risk, or testable assumption does this serve?**

Classify it as:

- **Keep:** removing it prevents task completion, makes the state unclear, violates a constraint, or blocks the core product test.
- **Simplify:** the need is real, but the presentation or implementation has more detail than version one requires; simplification must preserve the intended outcome.
- **Defer:** useful after the central behavior works, but not needed to validate it.
- **Remove:** decorative, duplicated, speculative, or unable to be traced to a requirement.

Do not keep a feature merely because a competitor has it, it makes the page look complete, or implementation is easy.

MVP is not permission to ignore explicit business rules or product integrity. Implement only the minimum system protection needed for monetization, entitlement, permission, data consistency, safety, compliance, and accessibility. Do not turn those protections into broad user-facing exception flows unless the core experience requires them.

## Preserve core functional strength

Reduce breadth, not the strength of the retained core. A first version must still deliver its primary outcome end to end at a level that gives users a meaningful reason to use it and produces a valid product test. Do not label a demo, disconnected mock interaction, materially degraded output, or fragile happy-path-only behavior as an MVP when it cannot demonstrate the intended value.

For the retained core flow, preserve:

- outcome completeness: the user reaches the promised result rather than a placeholder;
- essential output quality and behavioral capability;
- continuity across the normal start, action, feedback, and completion states;
- reliability for the intended launch conditions; and
- required integration with existing product capabilities when their absence would weaken the result.

Find savings by removing secondary audiences, optional scenarios, customization, duplicated controls, automation, presentation layers, and speculative extensions. Do not save cost by weakening the defining capability, lowering its necessary quality, or breaking the end-to-end contract.

If the available budget cannot support the core at the required strength, narrow the launch audience, supported scenario, access volume, or distribution scope, or delay release. Do not silently trade away the central value proposition to meet a date or budget.

## Require observable benefit

Keep a material version-one change only when it has at least one of these:

- a measurable outcome tied to the central product assumption or core task;
- a direct, observable reduction in implementation cost, operating cost, failure rate, or user effort; or
- a required business, safety, entitlement, permission, or data-integrity outcome supported by known constraints.

For a measurable change, identify the current observation or baseline when available, the expected direction or decision threshold, the measurement window, and the event or metric that will show the result. When an exact target is premature, use a credible proxy and state what decision it will support. Do not use activity-only measures such as raw clicks or page views unless they connect to completion, quality, retention, cost, or revenue.

Prefer changes with high-confidence benefit from existing platform behavior, demonstrated user friction, or known implementation constraints. Defer speculative improvements whose benefit cannot yet be observed or whose signal will not change a product decision.

Evaluate benefit against total ownership cost, not initial implementation effort alone. Include design, development, testing, support, compatibility, migration, monitoring, and ongoing maintenance. Consider the project's available budget and runway: a change with possible future value does not belong in version one when its current evidence is weak and its ongoing cost competes with validating the core product.

## Keep non-core boundaries out of version one

Version one should not productize hypothetical user-boundary and lifecycle cases by default. Do not add extra UI states, recovery automation, compatibility branches, migration logic, or support workflows merely because an edge case may become relevant later. Each additional boundary becomes a maintained product contract.

Treat ordinary interruption, permission denial, failure of a required dependency, and session completion as core states when they occur in the supported scenario. Do not defer them as hypothetical boundaries. Provide the smallest honest feedback and recovery path; do not expand them into a generalized recovery system.

For non-core cases, prefer one of these version-one treatments:

- declare the case unsupported and constrain who or what can enter the flow;
- use a feature flag, simple rejection, or manual operational handling;
- record the case as a known exclusion without exposing a dormant control; or
- defer the decision entirely until real usage supplies evidence.

Bring a deferred boundary into product scope only when observed incidents, affected core-task completion, revenue exposure, support volume, or manual handling cost crosses a stated threshold. Future usefulness by itself is not sufficient evidence.

The exception is a failure that would make launch irresponsible: illegal or unsafe behavior, unauthorized access, uncontrolled direct financial loss, systemic corruption, or irreversible loss of important user data. Contain these with the cheapest reliable system guard. This exception does not justify a complete self-service recovery flow, a generalized edge-case framework, or speculative front-end states.

## Preserve the host product

When extending an existing platform:

- reuse its palette, typography, spacing, controls, navigation, and message patterns;
- introduce a new pattern only when the new task cannot be expressed clearly with an existing one;
- do not invent a feature-specific color system or decorative identity unless explicitly required; and
- adapt the product behavior, not unrelated application surfaces from a reference screen.

Competitor references provide evidence about information and flows, not instructions to copy their full layout.

## Apply visual restraint

- Make the primary task clear in the first viewport, with sufficient space for its content and controls; avoid oversized hero areas that displace the task.
- Hide secondary information behind one clear disclosure when it does not need constant visibility.
- Prefer one obvious control over duplicated shortcuts.
- Use typography, spacing, alignment, contrast, and material treatment to create a deliberate hierarchy. Minimal interfaces still need craft and recognizable character.
- Use motion or sound when they support orientation, feedback, closure, or an explicitly requested atmosphere. Keep them proportional and provide suitable reduced-motion or silent alternatives.
- Choose color, depth, imagery, and surface treatment from the product's visual direction. Remove gratuitous repetition and competing decoration; do not turn stylistic preferences into universal bans.
- Keep explanatory copy short and place it only where it prevents a likely mistake.
- Do not make every possible setting visible in the first version.

Minimal does not mean incomplete: retain necessary feedback, validation, error handling, and state changes for the core flow.

Before implementation, establish a compact design brief: use context, visual direction, content hierarchy, reusable components or tokens, and relevant states. Keep established product tokens. For a new product, choose a small coherent set rather than building a full component library. Inherit explicit monochrome or other brand constraints only for the current product, never as a default for all future products. Follow [UI/UX decisions](references/uiux.md) for operational criteria.

## Require interaction integrity

Treat every visible control as a product promise. Do not expose a button, link, tab, menu item, or label implying an action unless the first version completes the smallest useful version of that action. If it cannot be completed, remove or defer the affordance instead of leaving it inert.

For each retained interaction, verify the full loop:

- the entry point communicates what will happen;
- the action produces a visible state or result;
- overlays and temporary states have a clear exit or cancellation path;
- completion returns the user to a stable state; and
- errors or blocked actions do not strand the user.

Use one canonical control for an action when multiple controls are visible in the same context. Duplicate entry points are justified only when they serve meaningfully different contexts, responsive layouts, or accessibility needs. A control that toggles a panel can own both opening and closing when it remains visible and understandable; do not automatically add a second close control.

Before irreversible or materially data-losing actions, explain the concrete consequence and offer cancellation before committing. Prefer immediate action with undo for safely reversible changes. Do not ask again before an ordinary action the user has already authorized.

Secondary content can use a simple drawer or modal when users need to inspect it without leaving the primary flow. Keep the first version read-only unless editing is explicitly required. The viewer must show the information promised by its entry point, not merely another summary of it.

After removing, moving, or consolidating controls, audit dependent behavior such as responsive selectors, keyboard access, disabled states, state ownership, and other entry points. Simplifying one surface must not silently break another state.

Prototypes may use sample data, but their core controls and state transitions must demonstrate the intended product contract rather than acting as decorative placeholders.

For stateful flows, specify the trigger, visible or audible feedback, data/resource effect, and next stable state. Distinguish pause, dismiss, finish, and discard wherever their consequences differ. Define completion from the user's perspective, including what has been saved, what stops, what happens later, and what remains available on return. Do not claim an app can close a host surface or keep running in the background without platform support and verification.

For AI or asynchronous work, define the minimum behavior contract: when to act, when input is needed, how work advances, when it stops, what progress the user can observe, and how failure preserves prior valid work. Ask only when missing information or consequential choices actually block the next step. Keep internal reasoning, orchestration, and diagnostic configuration out of the product UI unless users need them to decide.

## Review before implementation

Carry the premise assessment and its disposition into the review. Produce a short audit with four groups—Keep, Simplify, Defer, Remove—and map each decision to a requirement or MVP hypothesis. State the non-negotiable capability and quality level of the retained core. For every kept material change, include its expected benefit, observable signal, and total ownership cost. For deferred boundaries, state the launch constraint or manual treatment and the evidence threshold that would reopen them. Scale this to the change. When implementation is requested, continue with the authorized core flow and required states without inserting another approval gate. If the user asked for analysis only, stop after the audit and do not modify artifacts.

## Validate the result

Check these invariants:

1. A user can identify and complete the primary task without reading product explanations.
2. Every visible control has a requirement-backed purpose.
3. The first version tests the central product assumption rather than visual novelty.
4. Existing platform language remains recognizable.
5. Secondary features do not compete with the primary flow.
6. Visual choices support task clarity, intended atmosphere, or an explicit brand requirement; scope cuts preserve the quality needed for a credible test.
7. Every visible affordance completes a useful interaction or is removed.
8. Irreversible or materially data-losing actions allow informed cancellation; reversible changes use proportionate feedback or undo.
9. One canonical control owns each action unless duplication has a contextual reason.
10. Desktop, responsive, open, closed, empty, and disabled states still work after simplification when they are relevant to the flow.
11. Every kept material change has an explicit benefit hypothesis and an observable signal or known required outcome.
12. Non-core boundary handling has not been turned into a maintained product feature without observed demand.
13. Kept changes justify their design, build, support, and maintenance cost within the project's current budget and runway.
14. Launch-critical legal, safety, authorization, uncontrolled-loss, and irreversible-data-loss risks have the smallest reliable system guard.
15. The reusable skill contains no project-specific facts or combination of clues that can reconstruct its source project.
16. Scope reductions remove breadth or secondary complexity without weakening the retained core outcome, required quality, or end-to-end behavior.
17. Start, interruption, completion, and return have clear consequences for data, background work, and resources when relevant.
18. The result was exercised in the actual available runtime; source checks, simulated interactions, visual inspection, device testing, and live integration evidence are reported separately.
19. The handoff opens or runs as described, labels mocked or unavailable capabilities, and does not imply that a build, deployment, or real-world test occurred without evidence.

Before handing off, inspect the rendered result and complete the relevant core interactions when tools permit; repair defects within scope and recheck affected behavior. Use [delivery and verification](references/delivery.md). When reporting, state the result, material scope decisions, verification performed, and unresolved limits concisely. Do not justify unnecessary design after the fact or claim that an unperformed check passed.
