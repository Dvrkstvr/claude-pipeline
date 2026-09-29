# Playbook — <project name>

<!-- The project's operating manual for agents. Filled at stage 6 (or at adopt).
     Short and factual; rationale goes to decisions.md. -->

## Approach
- primary: <card> — <one line on how it applies here>
- secondary: <card> for <area> (optional)

## Stack
- <languages, frameworks, pinned versions>
- stack card: `<stacks/*.md>`
- docs: <Context7 ids / URLs at the pinned versions>

## Check commands (all must pass before a commit)
```
<typecheck>
<lint>
<test>
<build>
```

## Run & verify
- run: <command(s)>
- agent eyes: <MCP / CLI / browser / editor tool and how to start it>
- two-instance / multi-user testing: <how, if relevant>

## Quality bar (track: <track>)
- <e.g. every stored-data change has a migration and a test>
- <e.g. every user-facing string in the i18n file>
- <e.g. mutation check on pure modules each milestone (deep)>

## Voice & conventions
<Only what a reviewer would otherwise flag: copy tone, naming, commit style.>
