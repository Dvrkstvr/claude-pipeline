# .NET (Blazor, Avalonia, MAUI, console, libraries)

## Checks
`dotnet build -warnaserror` (or a curated warning set), `dotnet test`,
`dotnet format --verify-no-changes`. The `csharp-lsp` code-intelligence plugin
gives Claude diagnostics after each edit (needs `csharp-ls` on PATH).

## Run & drive
- Blazor WASM / web: `dotnet run` or a static publish served locally; drive with
  Playwright CLI (prefer CLI + skill over the MCP server — lighter on context).
- Avalonia desktop: headless tests (`Avalonia.Headless`) for UI logic; a console
  or CLI head over the same core is the cheapest way for an agent to exercise it.
- Terminal apps: run and read output.

## Fakes
Transport, storage and clock behind interfaces in an Abstractions project; an
in-memory transport lets two clients play against each other in one test.

## Ship
Blazor on GitHub Pages: base href, 404 fallback, service worker only if PWA is
real. CI must run `dotnet test`, not just publish. Mobile heads: signing and
provisioning are their own milestone, not a scaffold.

## Docs
Microsoft Learn for the target framework version; Context7 for third-party
packages (Avalonia, networking libraries etc.) at the version in the csproj.
