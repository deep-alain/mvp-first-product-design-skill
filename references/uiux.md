# UI/UX decisions

Apply these criteria to the supported task, not to every imaginable future state. Keep the design brief in the current project, not in this reusable skill.

## Establish the design brief

Resolve the following from existing product assets and user instructions; ask only for a choice that materially changes the result and cannot be inferred.

| Decision | Record only what affects implementation |
| --- | --- |
| Use context | Device, attention, input method, environment, and session length where known |
| Entry and orientation | Where users begin, what object or mode they are in, and the next useful action |
| Visual direction | Intended character, a few concrete visual choices, and constraints inherited from the host product |
| Hierarchy | Primary content/action, supporting status, and secondary disclosure |
| Tokens and components | Existing source of truth; otherwise a small type, spacing, color, surface, radius, and focus vocabulary |
| State behavior | Relevant transitions, feedback, content preservation, and completion |

Do not choose a different visual language just because a reference looks attractive. Explain the useful principle in the reference and adapt it to this product. Do not infer exact fonts, pixel values, or invisible interaction states from screenshots alone.

## Make a restrained interface feel designed

- Establish hierarchy through type scale, line length, spacing rhythm, alignment, and contrast before adding decorative surfaces.
- Give the primary interaction enough room. Avoid both cramped controls and empty hero layouts that hide the task below the fold.
- Use realistic content lengths and actual empty data. Do not fabricate activity, statistics, or recent history to make a dashboard look finished.
- Remove copy that repeats a heading or explains an obvious control. Keep labels and status information that prevent uncertainty.
- Use consistent components and semantic tokens. Add a new component only when the existing vocabulary cannot express the task clearly; do not require a full design-system project for a small demo.
- Treat touch targets, readable contrast, keyboard focus, and disabled/selected differences as usability requirements. A subdued palette must still communicate hierarchy and state.
- Check long content, narrow layouts, scrolling ownership, overlays, and the on-screen keyboard where relevant. Do not shrink the desktop arrangement and call it mobile design.
- Let atmosphere serve the intended use. Sound and movement can mark progress or completion; avoid surprise playback, competing effects, or indispensable audio-only feedback.

## Design the whole interaction

Use a small state table when state has meaningful consequences:

| Current state | User or system trigger | Feedback | Data/resource effect | Next stable state |
| --- | --- | --- | --- | --- |

Fill only the states needed by the current task. A stateless control does not need a state-machine document.

- Make entry, active mode, relevant identity, and primary action legible without a tutorial.
- Use good defaults. Expose a setting only when the user must make the choice now or when changing it materially affects the result; disclose the rest progressively.
- Separate pause, dismiss, finish, and discard by their actual effects. Preserve work when leaving a surface if that is the established contract.
- Define when a session ends, how users know, what resources stop, and what remains on return. A completion label without the corresponding behavior is incomplete.
- For deferred results, show the honest pending state, delivery condition, failure outcome, and access to the last valid result when applicable. Do not equate scheduled work with completed output.
- Handle ordinary permission or dependency failure on the core path with actionable feedback and the smallest useful retry, fallback, or exit. Retain valid prior content.
- For AI behavior, tie output to a change in task state or useful information. Avoid repeated confirmation loops and decorative progress that does not reflect work.
- Respect platform limits. Simulated time, mocked services, and automated UI events do not prove real background behavior, audio quality, permissions, or physical-device ergonomics.

## Decide whether a UI change helped

Link each material change to a specific observed friction and a check: clearer entry, fewer unnecessary decisions, easier input, clearer status, usable interruption, or reliable completion. Compare affected states at equivalent viewport sizes when before/after evidence exists. Treat subjective style choices separately from broken behavior or violations of agreed rules. Do not invent a usability score or infer user satisfaction from a screenshot.
