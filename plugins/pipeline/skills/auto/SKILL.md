---
name: auto
description: Autopilot — run the pipeline stage after stage until a target (stage, milestone, feature or mvp) is reached, stopping only for sign-offs, blocking questions, stalls or the round budget.
argument-hint: "[stage <n> | M<x> | F-<id> | mvp] [--max-rounds N]"
disable-model-invocation: true
---

# Pipeline — auto

Plugin root (`$ROOT`): `${CLAUDE_PLUGIN_ROOT}`

1. Read `$ROOT/reference/conductor.md` and act as the conductor it describes for
   the rest of this conversation.
2. Read `$ROOT/reference/autopilot.md` and run the conductor loop under its rules
   until the target is reached or a stop condition hits.
3. If `pipeline/autopilot-log.md` shows an unfinished run for the same target,
   continue it. Keep its round counter.

Target and options: $ARGUMENTS
