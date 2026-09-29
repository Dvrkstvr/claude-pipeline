# Web (any framework)

## Checks
Type check, lint, unit tests, production build — each one command.

## Run & drive
Dev server via a `.claude/launch.json` entry; agent eyes via Playwright CLI (or
the built-in browser pane). Read the DOM/accessibility tree before screenshots.
Check at phone width as well as desktop.

## Fakes
Network via a mock server or MSW; time via fake timers; storage via an
in-memory adapter.

## Ship
Host, domain, HTTPS, caching headers, env vars kept out of the repo, a privacy
page if anything is collected, third-party notices for bundled code.

## Docs
Context7 for the framework at the project's version.
