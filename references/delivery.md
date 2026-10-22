# Delivery and verification

Match the handoff to the requested work and available runtime. Prefer a working revision of the existing artifact over a replacement demo when the scope permits.

## Choose the promised level

Distinguish a visual exploration, an interactive prototype with sample or simulated data, and an integrated MVP that delivers its core result under stated conditions. Name the level honestly. A prototype can validate layout or a flow; it cannot establish output quality, retention, or live integration reliability by itself.

Deliver the format the user requested. For runnable work, provide a working entry point and necessary source with concise run instructions. For design handoff, provide the requested artifact plus the key states, rules, and component references needed to implement it. Do not produce every possible output format by default.

## Inspect, repair, then package

1. Inspect the existing artifact, instructions, and reported friction. Identify the changed flow and affected shared components. Preserve working data contracts and unrelated behavior.
2. Implement a coherent slice. Keep sample data, simulated behavior, live capability, and unfinished dependencies distinguishable. Never fake a successful save, generated file, duration, delivery, or permission grant.
3. Run focused checks appropriate to the change. Prefer a real walkthrough of the retained core over tests that merely repeat the implementation. Reuse passing checks until a change or unresolved risk warrants rerunning them.
4. Inspect the rendered result at relevant viewport sizes and states. Complete primary actions, cancellation/interruption, completion, and return where supported. Check overlays, scrolling, readable hierarchy, and focus for the affected surfaces.
5. Fix defects within the authorized scope and recheck the affected path. If blocked, state the exact unverified part and preserve the usable result; do not mark the whole experience as verified.
6. Build or package when requested and after the preceding checks. Honor an explicit instruction to hold packaging. Avoid repeated installers, duplicate demos, or deployments for every minor edit. If packaging or deployment is requested, finish that authorized step when prerequisites pass.

## Keep evidence levels separate

| Evidence | Supports | Does not establish |
| --- | --- | --- |
| Source or schema inspection | Structure and explicit rules | Runtime behavior or rendered quality |
| Build or unit checks | Compilation or tested local logic | Usability or live integration |
| Runtime interaction | Observed transitions in the tested environment | Untested devices, production permissions, or user preference |
| Rendered screenshots inspected | Visible layout at the recorded viewport/state | Focus, touch comfort, timing, audio, or all responsive states |
| Live integration or device checks | The specific service/device behavior exercised | Unmeasured retention, general reliability, or product demand |
| User observation | What that participant did or reported | Universal preference or causal impact without a suitable study |

Record viewport/environment, checked behavior, observed result, and unresolved limitation at a level proportional to the task. A test script that exists but was not run is not a passing check. Never turn an earlier assistant's completion claim into fresh verification.

## Make the handoff actionable

State what changed and which friction it addresses; provide the artifact or entry point, essential operating instructions, checks actually performed, and material limits. Keep technical diagnostic detail out of product screens. Report simulation and unavailable capabilities near the handoff without adding a distracting implementation tutorial to the product.

Do not claim that a local revision is installed, remotely saved, published, or deployed unless that action succeeded. Preserve the established artifact identity and version when updating it. A screenshot, code listing, build artifact, and accessible running product are different deliverables.

## Learn without overgeneralizing

After a demo, distinguish observed behavior, user feedback, and proposed explanations. Convert recurring friction into a reusable decision criterion; keep project-specific names, screens, operational limits, and business decisions out of this skill. A product's chosen palette, platform, or input method is not a universal default. Carry forward validated lessons without reopening settled decisions or expanding the next revision automatically.
