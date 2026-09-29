---
name: run
description: Start or continue the idea → MVP pipeline in this project. Runs the next stage from pipeline/STATUS.md, or intake for a new idea.
argument-hint: "[idea, or an instruction like 'raise track to deep']"
disable-model-invocation: true
---

# Pipeline — run

Plugin root (`$ROOT`): `${CLAUDE_PLUGIN_ROOT}`

1. Read `$ROOT/reference/conductor.md` and act as the conductor it describes for
   the rest of this conversation.
2. If `pipeline/STATUS.md` exists: continue from the stage it names.
3. If it doesn't:
   - the repo already has real source code or a git history of more than a few
     commits → say so and recommend `/pipeline:adopt` instead; continue only if
     the user wants a fresh start alongside the existing code.
   - otherwise → stage 1 (intake). Treat the arguments below as the user's first
     description of the idea.

User input: $ARGUMENTS
