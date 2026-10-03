# Autopilot

The conductor loop (`conductor.md`) run back to back until a **target** is
reached, without the stop at every stage boundary. Gates, sign-offs and the
verifier work exactly as before. Autopilot removes only the routine pauses.
It adds a round budget and stall detection so it can't spin.

## Target

Parsed from the skill arguments. Default: the end of the current milestone.

| Target | Reached when |
|---|---|
| `stage <n>` | stage n's gate passes |
| `M<x>` | stage 7 gate passes for milestone x (verified, reviewed, curated) |
| `F-<id>` | that feature `passes: true` with evidence (runs `feature.md`) |
| `mvp` | every MVP milestone done; stage 9 gate passes if the track runs it |

`--max-rounds N` (default **12**). One round is one dispatch → gate cycle: a
stage agent, a batch of build tasks, a verify, or a review.

## Setup

1. No `pipeline/STATUS.md` → autopilot can't start: intake is interactive.
   Run `/pipeline:run` (or `/pipeline:adopt`) first, then come back.
2. Write the autopilot line into STATUS.md "Now" (replaces any old one):
   `autopilot: <target> · round <n>/<max> · progress <score> · stall <k>`
3. Create or append `pipeline/autopilot-log.md`: one `## Run <date> → <target>`
   heading, then one line per round. This is the only autopilot history file.
   STATUS.md stays ≤ 60 lines.

## Each round

1. **Reload**: `STATUS.md` + the last 10 lines of `autopilot-log.md`.
2. **Run one step of the conductor loop** (its steps 3–7), with these changes:
   - step 8 (stop at the stage boundary) becomes a **1-line status** to the user,
     and the next round starts. Leave the stop out only when the next stage is
     still within the target.
   - Stage 7, built-in engine: see "Parallel build" below.
3. **Score progress.** Read it from the files, not from agent reports:
   `progress = stage · gate must-items met · features passing · open blocking`
   A round made progress if the stage advanced, more must-items are met, more
   features pass, or a blocking question was closed.
4. **Log** one line: `R<n> <step> → <gate result> · progress <score> · <decision>`.
5. **Decide** using the table below.

## Decide

| Situation | Action |
|---|---|
| Target reached | **Stop**: final report |
| Progress | Next round |
| No progress, 1st time | Re-dispatch with the exact gap named (the conductor's failed-gate rule) |
| No progress, 2nd time in a row | Change approach: a `hypothesis` → `pipeline:spike-runner`; a repeated verifier fail → dispatch `pipeline:builder` with *diagnose only, root cause* before any more fixes |
| No progress, 3rd time in a row | **Stop**: blocked. Report what was tried and the failing item |
| Round budget used up | **Stop**: report status and the next action |

## Always stop and ask (autopilot never skips these)

- every **user sign-off point** in `conductor.md` (brief, MVP cut, mockups that
  settle a blocking question, raising the track, changes to the core promise)
- open `blocking` questions → run the clarify loop (`clarify.md`), then **resume**
  the autopilot in the same conversation
- **owed checks** at a milestone boundary: ask for them, then resume
- outward-facing or irreversible actions: push, merge to the main branch,
  publish, store upload, deleting user data
- the conversation is getting long at a milestone boundary → stop and say:
  *"Fresh session, then `/pipeline:auto <same target>`. The files carry
  everything."* The round counter continues from the log.

## Parallel build (stage 7, built-in engine only)

With Superpowers installed, keep `stages/07-build.md` as written: its
`subagent-driven-development` already does this. Otherwise:

1. Break the milestone into tasks in `scope.md` (as stage 7 says). Mark each
   task with the files or modules it touches.
2. Each round, take the ready tasks (dependencies done). Group tasks with
   **disjoint** files into a batch of at most 4.
3. Dispatch one `pipeline:builder` per task **in parallel**, all on the
   milestone branch. Builders don't commit. Tasks that overlap go in later
   batches.
4. After the batch: run the playbook's check commands yourself. Green → one
   commit per task, each message saying what was verified. Red → route the
   failing task back to its builder with the output.
5. When every task of the milestone is done: `pipeline:verifier` (fresh agent,
   never a builder) → stage 8 → curate, as usual.

## Final report (≤ 12 lines)

Outcome (target reached / blocked / budget / waiting on user) · rounds used ·
gate lines from STATUS.md · features passing · what's owed by the user ·
the next action · path to `autopilot-log.md`. Then clear the autopilot line in
STATUS.md, or set it to `autopilot: stopped — <reason>`.
