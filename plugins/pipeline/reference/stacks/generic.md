# Generic stack card

Use when no card fits. The architect fills the playbook by answering these.

## Checks
What proves the code is not broken without running it? Type checker, linter,
unit tests, build. Each must be one command with a non-zero exit on failure.

## Run & drive
How can an agent *see* the app working? In order of preference:
1. a CLI or HTTP interface it can call and read,
2. an automation tool with a text view (accessibility tree, DOM, editor
   hierarchy) — cheaper than screenshots,
3. screenshots,
4. the user checks by hand (last resort; record what they saw as evidence).

## Fakes
Which external things (network, device radio, store, AI, clock, filesystem)
need a fake so logic can be tested and two instances can be run locally?

## Ship
Artefact, signing, where it's hosted, how it updates, what the store/host
requires.

## Docs
Where current docs live (Context7 library id, official URL). Pin the version the
project uses.
