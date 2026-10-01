# Changelog

## Unreleased — Grok Optimizations (2026-10-01)

### Fixed
- **SessionStart never matched.** `hooks/hooks.json` used file globs (`*.cs|*.csproj|...`). Official SessionStart matchers filter session source (`startup|resume|clear|compact|fork`), so the harness did not inject .NET context after install. Matcher is now `startup|resume|clear|compact|fork`.
- **Hook cwd and output schema.** `session-start-context.js` now reads `cwd` from hook stdin (falls back to `process.cwd()`) and prints `hookSpecificOutput.additionalContext` so Claude Code actually receives the routing reminder. Still exits 0.
- CI asserts the SessionStart matcher contains session sources and not `*.`.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## Unreleased — Grok Optimizations (2026-09-30)

### Analysis (this session)
- Re-analyzed `main` and existing `grok_update` / **PR #16** via GitHub MCP. Did not recreate the branch or open a second PR.
- `main` SHA `55647e56` remains a complete Claude Code plugin: official `hooks/hooks.json` + 3 zero-block scripts, 11 skills / 14 agents / 174 refs.
- Install: `claude plugins marketplace add fenzel999/dotnet-artisan` then `claude plugins install dotnet-artisan`.
- `grok_update` already closes human + learning gaps: QUICKSTART, LEARNING, CONTRIBUTING, SECURITY, `dotnet-grok` + knowledge-promotion, plugin-validate CI, counts **12 / 14 / 175**.
- No new blocking defects found on 2026-09-30. Plugin can run on `main` today; this PR makes human onboarding and knowledge promotion first-class.

Waiting for human review — do not auto-merge.

## Unreleased — Grok Optimizations (2026-09-29 … 2026-09-01)

Daily re-audits on existing `grok_update` / PR #16. Did not recreate the branch or open a second PR. Added/confirmed:

- QUICKSTART / LEARNING / CONTRIBUTING / SECURITY
- `skills/dotnet-grok` + knowledge-promotion playbook
- plugin-validate CI (≥12 skills / ≥14 agents / ≥175 refs + manifest path asserts)
- plugin.json 1.0.3 with `skills`, `agents`, `hooks`, `homepage`
- marketplace owner `fenzel999`, counts **12 / 14 / 175**
- GUIDE / README / BEHAVIORS / USAGE routes for humans and Grok

Waiting for human review — do not auto-merge.

## 1.0.2 (2026-05-31) — Fix: move user guides out of skills/ to root

See git history on `main` for the 1.0.2 and earlier notes. This branch keeps that release as the baseline and layers the unreleased Grok optimizations above.
