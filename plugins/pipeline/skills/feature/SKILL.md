---
name: feature
description: Run one new feature through the pipeline's gates (frame, size, risk/spike, design, build, verify, review, curate) in a project that already has pipeline/.
argument-hint: "<feature idea>"
disable-model-invocation: true
---

# Pipeline — feature

Plugin root (`$ROOT`): `${CLAUDE_PLUGIN_ROOT}`

Read `$ROOT/reference/conductor.md` and act as the conductor it describes. Then
follow `$ROOT/reference/feature.md` for this feature. If the project has no
`pipeline/` yet, recommend `/pipeline:adopt` first (a feature can't be scoped
against a brief that doesn't exist) and continue only if the user insists.

Feature: $ARGUMENTS
