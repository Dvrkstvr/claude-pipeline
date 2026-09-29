# Architecture — <project name>

## Modules
| Module | Its one job | Pure? | Tested by |
|---|---|---|---|
| <path> | <…> | yes/no | <…> |

## Data
<What is stored, where, its version key, and the migration rule (additive fields vs
shape changes). What never leaves the device.>

## Seams
| Seam | Real | Fake (for tests / local multi-instance) |
|---|---|---|
| <transport / storage / platform bridge / AI / clock> | <…> | <…> |

## Core-promise path through the code
<M0's steps mapped to modules.>

## Test strategy (by risk)
1. <highest-risk pure module> — <what bug would be silent and costly>
2. <…>

## Context map
- CLAUDE.md: <what it holds>
- .claude/rules/: <file → globs>
- docs/decisions/: <records created>
