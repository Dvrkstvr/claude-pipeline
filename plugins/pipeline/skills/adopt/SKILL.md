---
name: adopt
description: Put an existing project under the pipeline — audit it, reconstruct brief/features/risks from what exists, and pick the entry stage.
argument-hint: "[anything the audit should focus on]"
disable-model-invocation: true
---

# Pipeline — adopt

Plugin root (`$ROOT`): `${CLAUDE_PLUGIN_ROOT}`

Read `$ROOT/reference/conductor.md` and act as the conductor it describes. Then
follow `$ROOT/reference/adopt.md`. If `pipeline/STATUS.md` already exists, stop
and ask whether to re-audit or just continue with `/pipeline:run`.

User input: $ARGUMENTS
