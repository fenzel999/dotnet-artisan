# Changelog

## Unreleased — Grok Optimizations (2026-08-27)

### Analysis
- Re-read `main` vs `grok_update` via GitHub MCP. Branch and **PR #16** already existed.
- Remaining gaps that actually blocked humans / maintainers (not already covered by `dotnet-grok`):
  - no contributor / security policy
  - `.gitignore` missing common .NET folders (`bin/`, `obj/`, `TestResults/`)
  - no CI to prove plugin JSON, skills, agents, and hook scripts stay valid
  - no 2-minute human quickstart besides the long GUIDE

### Added
- `CONTRIBUTING.md` — additive rules, skill/agent workflow, learning loop
- `SECURITY.md` — supported versions and report path
- `QUICKSTART.md` — install → verify plugin runs → daily routing table → learn new knowledge
- `.github/workflows/plugin-validate.yml` — JSON parse, SKILL.md presence, agent count, hook syntax, official `hooks/hooks.json` path

### Updated
- `.gitignore` — `bin/`, `obj/`, `packages/`, `TestResults/`, artifacts

### Goals (unchanged)
1. Help humans use the plugin (`QUICKSTART.md` + GUIDE + verification).
2. Keep the plugin runnable (zero-config hooks; CI validates structure).
3. Help the project learn (`dotnet-grok` + learning agent + CONTRIBUTING learning section).

## Unreleased — Grok Optimizations (prior sessions)

`dotnet-grok` skill, Grok-aware `dotnet-ai`, plugin.json `1.0.3`, skill count 12, bilingual README verification checklist. See PR #16 history. Waiting for human review — do not auto-merge.

## 1.0.2 (2026-05-31) — Fix: move user guides out of skills/ to root

### Fixed
- User-facing guides moved from `skills/dotnet-workflow/references/` to root `GUIDE.md` / `GUIDE.en.md`.
- Reference counts: workflow 3→1, total 176→174.

## 1.0.1 (2026-05-31) — Content quality and infrastructure

### Added
- `.gitattributes`, GitHub issue/PR templates, plugin verification and best-practices guides.

### Fixed
- Stale reference counts; `check-self-doc.js` always emits valid JSON.

## 1.0.0 (2026-05-29 / 2026-05-28)

Initial synthesized release from novotnyllc/dotnet-artisan, dotnet/skills, and dotnet-claude-kit. Later restructured to 11 skills / 14 agents on main; `grok_update` adds `dotnet-grok` (12 skills).
