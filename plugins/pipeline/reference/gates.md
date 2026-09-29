# Gates

A gate decides whether a stage's output is good enough to build on. Scores are
**derived from checklists and tags**, never asked for as a feeling — a model's
"clarity 8/10" is not evidence.

## Clarity

Every open question in `pipeline/open-questions.md` carries exactly one tag:

| Tag | Meaning | What happens |
|---|---|---|
| `blocking` | the answer changes what gets built, and no default is safe | gate fails until answered by the user |
| `assumable` | a sensible default exists and is cheap to reverse | default recorded in `decisions.md` as `assumed`; proceed |
| `deferred` | not needed for this milestone | parked; re-checked at scope and at each milestone start |

Tagging test: *"If we guess wrong, what does it cost?"* Rework of a day or less →
`assumable`. Data loss, a rewrite, a broken core promise, or anything the user
explicitly cares about → `blocking`.

**Clarity line** (written into STATUS.md):
`clarity: <must-items met>/<must-items> · blocking <n> · assumed <n> · deferred <n>`

## Feasibility

Every risk in `pipeline/risks.md` carries an **impact** (H/M/L) and an
**evidence** level:

| Evidence | Meaning |
|---|---|
| `known` | done before in this stack, or documented behaviour you checked |
| `platform` | depends on OS/device/store/vendor behaviour not yet observed |
| `hypothesis` | nobody here knows yet |
| `proven` / `disproven` | a spike ran; link its `RESULT.md` |

**Feasibility level**:
- **green** — no H-impact risk at `platform`/`hypothesis`
- **amber** — M-impact risks remain unproven; each has a named fallback
- **red** — an H-impact risk is unproven → spike it, mitigate with a written
  fallback the user accepts, or cut it from scope

**Feasibility line**: `feasibility: <green|amber|red> · H-open <n> · M-open <n> · spiked <n>`

## Passing a gate

A stage passes when **all** hold:
1. every *must* item in the stage file's checklist is met (check the files, not
   the agent's claim),
2. zero open `blocking` questions for this stage,
3. feasibility is not `red` (from stage 2 onward),
4. any sign-off the stage requires was given by the user in chat.

A failed gate is not a dead end: name the failing item, route it (clarify loop,
spike, or re-dispatch the agent with the gap), and re-check.

## Verification evidence (stage 7+)

A feature's `passes` flag in `features.json` flips to `true` only with evidence
recorded beside it: the command that ran and its result, or the screenshot /
run log path. "Looks done" is not evidence.
