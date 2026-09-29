# Loop-first

## Source of truth
The core loop as a player/user experiences it: one sentence ("move, collide,
score, retry") plus the running build.

## Stage emphasis
- **Scope (4)**: M0 is the loop with placeholder art/content and nothing else —
  no menus, no settings, no meta-progression.
- **Spike (3)** for anything the loop depends on that might not feel right
  (input latency, physics, netcode).
- **Design (5)** is feel-tuning notes and reference captures, not screens.
- Content and polish milestones come only after the loop is judged good by the user.

## Quality bar
The loop is playable end to end in one command; tunables live in one data file,
not in code.

## Verify by
Playing it: recorded run, the user's verdict recorded as a decision. Automated
checks for everything that isn't feel (build, logic tests).

## Watch out for
Building systems (inventory, save, UI framework) before the loop is fun.
