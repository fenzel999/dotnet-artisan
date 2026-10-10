# Changelog

## 1.0.11 (2026-10-10) — Smoke test no longer false-positives on the 10.0.13 warning

### Fixed
- `scripts/hooks/smoke-test.js` treated the expected phrase "do not invent 10.0.13" as an invented patch, so CI failed even though the support note was correct. The assertion now only fails when the note claims 10.0.13 (or higher) is the current/latest patch.

### Learned
- Official policy page still dated 2026-09-08 (rechecked 2026-10-10). `net10.0` remains 10.0.12. Patch Tuesday 2026-10-13 has not yet occurred. From 2026-10-10, net8/net9 have 31 days left until 2026-11-10.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.10 (2026-10-09) — Live support countdown; Copilot route when hooks do not run

### Fixed
- SessionStart hardcoded "34 days" from 2026-10-07. The note now computes days left until 2026-11-10 from UTC midnight, so it does not go stale. Smoke test rejects the frozen "34 days" string and a made-up 10.0.13 patch.

### Added
- `.github/copilot-instructions.md` so GitHub Copilot and Cursor still load `using-dotnet` → `dotnet-advisor` when Claude Code hooks cannot run.

### Learned
- Policy page rechecked 2026-10-09, still dated 2026-09-08. `net10.0` is 10.0.12, `net8.0` is 8.0.31, `net9.0` is 9.0.20. Both net8 and net9 end 2026-11-10 (32 days from this note). `net11` is still `11.0.0-rc.1`. Do not invent a newer patch before 2026-10-13.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.9 (2026-10-08) — VB-only repos get the prompt reminder

### Fixed
- `user-prompt-dotnet-reminder.js` treated only `.csproj` / `.fsproj` and `.cs` / `.fs` as a .NET repo. A folder with only `App.vbproj` and a prompt that does not say ".NET" never received `using-dotnet` routing. It now also matches `.vbproj` / `.vb`, and the keyword list includes `vb.net` / `vbproj`.
- Smoke test covers that VB-only case with a non-.NET prompt.

### Learned
- SessionStart detecting `.vbproj` is not enough. Prompt routing is a second gate. Recorded in `LEARNING.md`.
- Support window unchanged as of 2026-10-08: net8/net9 still end 2026-11-10 (33 days). Do not invent 10.0.13 before Patch Tuesday 2026-10-13.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.8 (2026-10-07) — Support window rechecked; say what "running" means

### Learned
- Official policy and download pages are still dated 2026-09-08. `net10.0` remains 10.0.12, `net8.0` is 8.0.31, `net9.0` is 9.0.20. Both net8 and net9 end 2026-11-10 (34 days from this note). `net11` is still `11.0.0-rc.1`. Next Patch Tuesday is 2026-10-13; do not invent a newer patch.
- SessionStart support note now says the 2026-10-07 verification date and the 34-day countdown.

### Fixed
- QUICKSTART splits "hook script runs" from "Claude Code injected context". Grok cannot run `claude plugins install` for the human. Marketplace install still tracks `main` until PR #16 is merged.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.7 (2026-10-06) — Counts match the tree; harness smoke test is green

### Fixed
- Docs disagreed with the tree: marketplace said 177 references, README said 176, AGENTS/QUICKSTART still said 12 skills / 175 references. Aligned to **13 skills / 14 agents / 177 references**. README skill table now lists `dotnet-learning`.
- QUICKSTART tells humans to run `node scripts/hooks/smoke-test.js`. That script passed on 2026-10-06.

### Learned
- .NET support policy page is still the 2026-09-08 update. `net10.0` patch remains 10.0.12 until Patch Tuesday 2026-10-13. Do not upgrade net8/net9 without asking; both end 2026-11-10.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.6 (2026-10-05) — Support window the harness can say out loud

### Added
- `skills/dotnet-devops/references/dotnet-support-window.md` — verified support dates: net10.0 LTS through 2028-11-14; net8.0 and net9.0 end 2026-11-10; net11 is still RC. Source: Microsoft support policy updated 2026-09-08.
- SessionStart now appends that note when it detects the TFM, so a human can see the plugin actually read the project. `.vbproj` is treated as .NET alongside `.csproj` / `.fsproj`.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.5 (2026-10-04) — PostToolUse stdin fix

### Fixed
- **check-self-doc.js ignored official hook input.** It only read `CLAUDE_TOOL_INPUT`. Claude Code passes `tool_input` on stdin, so the 30-second purpose-comment reminder never fired after Write/Edit. The script now reads stdin first, falls back to the env var, and emits `hookSpecificOutput`.
- Smoke test covers F# `.fsproj` detection, PostToolUse reminder, and `Program.cs` skip.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.4 (2026-10-03) — Learning skill and harness smoke test

### Added
- **dotnet-learning skill** — human-facing capture flow for corrections and verified facts, with `references/capture-template.md`. The learning agent previously pointed at workflow memory with no skill of its own.
- **scripts/hooks/smoke-test.js** — creates a temporary `net10.0` project and checks SessionStart reports the TFM and UserPromptSubmit routes to `using-dotnet` without repeating after the skill is requested.
- CI step runs the hook smoke test on pull requests.

### Fixed
- Marketplace and README skill/reference counts now include `dotnet-learning` (13 skills, 176 reference files, 14 agents).

## Unreleased — Grok Optimizations (2026-10-02)

### Fixed
- **UserPromptSubmit scanned the wrong directory.** `user-prompt-dotnet-reminder.js` parsed the prompt from hook stdin but still walked `process.cwd()`. If the hook process cwd is not the session cwd, a .NET repo got no routing reminder. It now uses stdin `cwd` (fallback `process.cwd()`), skips `bin`/`obj`, and treats `.fsproj` / `.fs` as .NET.
- Recorded the rule in `LEARNING.md` so the next maintenance pass does not regress it.

## Unreleased — Grok Optimizations (2026-10-01)

### Fixed
- **SessionStart never matched.** `hooks/hooks.json` used file globs (`*.cs|*.csproj|...`). Official SessionStart matchers filter session source (`startup|resume|clear|compact|fork`), so the harness did not inject .NET context after install. Matcher is now `startup|resume|clear|compact|fork`.
- **Hook cwd and output schema.** `session-start-context.js` now reads `cwd` from hook stdin (falls back to `process.cwd()`) and prints `hookSpecificOutput.additionalContext` so Claude Code actually receives the routing reminder. Still exits 0.
- CI asserts the SessionStart matcher contains session sources and not `*.`.

## Unreleased — Grok Optimizations (2026-09-30)

### Analysis
- Re-analyzed `main` and existing `grok_update` / **PR #16** via GitHub MCP. Did not recreate the branch or open a second PR.
- `main` remains a complete Claude Code plugin: official `hooks/hooks.json` + 3 zero-block scripts, 11 skills / 14 agents / 174 refs.
- Install: `claude plugins marketplace add fenzel999/dotnet-artisan` then `claude plugins install dotnet-artisan`.
- `grok_update` closes human + learning gaps: QUICKSTART, LEARNING, CONTRIBUTING, SECURITY, `dotnet-grok` + knowledge-promotion, plugin-validate CI, counts **12 / 14 / 175**.

## Unreleased — Grok Optimizations (2026-09-29 … 2026-09-01)

Added/confirmed on existing `grok_update` / PR #16:

- QUICKSTART / LEARNING / CONTRIBUTING / SECURITY
- `skills/dotnet-grok` + knowledge-promotion playbook
- plugin-validate CI (≥12 skills / ≥14 agents / ≥175 refs + manifest path asserts)
- plugin.json 1.0.3 with `skills`, `agents`, `hooks`, `homepage`
- marketplace owner `fenzel999`, counts **12 / 14 / 175**
- GUIDE / README / BEHAVIORS / USAGE routes for humans and Grok

## 1.0.2 (2026-05-31) — Fix: move user guides out of skills/ to root

### Fixed
- **Category error: user-facing guides were placed in `skills/dotnet-workflow/references/`** — The `skills/` directory is for AI-agent-facing reference files. User guides for human developers belong at the project root.
- **Moved** `plugin-usage-best-practices.zh.md` → `GUIDE.md` (Chinese, root)
- **Moved** `plugin-usage-best-practices.md` → `GUIDE.en.md` (English, root)
- **Removed** routing table entries from dotnet-workflow SKILL.md and INDEX.md
- **Updated** reference counts: workflow 3→1, total 176→174
- **Updated** README "Further Reading" sections to link to new GUIDE files

## 1.0.1 (2026-05-31) — Content quality and infrastructure

Fixed stale reference counts, added missing infrastructure files, created verification and best practices guides.

### Fixed
- **USAGE.md reference counts** — Updated dotnet-api (32→33), dotnet-testing (13→14), dotnet-devops (18→19), dotnet-tooling (34→41) to match actual INDEX.md
- **CLAUDE.md agent count** — 13→14 specialist agent files (was missing dotnet-pr-workflow from count)
- **check-self-doc.js hook** — All early-exit paths now emit valid JSON before returning

### Added
- **`.gitattributes`** — Consistent line ending normalization for all file types (.cs, .md, .json, .sh, etc.)
- **`.github/ISSUE_TEMPLATE/bug_report.md`** — Bug report template with affected file, expected vs actual behavior
- **`.github/ISSUE_TEMPLATE/feature_request.md`** — Feature request template with scope checkboxes
- **`.github/PULL_REQUEST_TEMPLATE.md`** — PR template with content quality, consistency, and technical checklists
- **`plugin-verification.md`** — Step-by-step guide to verify plugin installation, harness hooks, skill loading, and iron rules enforcement
- **`plugin-usage-best-practices.md`** — Comprehensive daily workflow patterns, skill-specific tips, and troubleshooting guide

### Updated
- All reference count numbers across AGENTS.md, CLAUDE.md, README.md, README.en.md, INDEX.md (173→175)
- dotnet-workflow SKILL.md now has a Routing Table referencing the 2 new companion files

## 1.0.0 (2026-05-29) — Updated release

Major restructuring: skill/agent consolidation, strategic DDD support, solution architect, decision-maker enhancement.

### Restructured
- **Skills: 14 → 11** — Merged `dotnet-quality`→`dotnet-tooling`, `dotnet-upgrade`→`dotnet-devops`, `dotnet-learning`→`dotnet-workflow`
- **Agents: 17 → 13** — Merged 3 performance agents into `dotnet-performance-specialist`, 3 UI agents into `dotnet-ui-specialist`, 2 lifecycle agents into `dotnet-code-lifecycle-agent`

### Added
- **`dotnet-domain-analyst` agent** — Strategic DDD: event storming, bounded contexts, ubiquitous language, domain analysis document output
- **`dotnet-architect` enhancement** — Full solution architect: architecture selection (single/VSA/DDD/Clean), folder structure generation, build config (Directory.Build.props, CPM, .slnx, global.json, editorconfig)
- **Architecture discovery** — `dotnet-advisor/references/architecture-discovery.md`: monolith vs modular vs microservices decision guide, DDD strategic design (MUST)
- **Requirements alignment** — `dotnet-advisor/references/requirements-alignment.md`: 4-round dialogue framework (domain → architecture → tech → quality)
- **Decision-maker domain decomposition** — Step 4 enhanced to decompose complex projects into parallel domain skills (API + UI + testing + DevOps + tooling simultaneously)
- **Cross-platform debugging** — WinDbg (Windows) + dotnet-dump/lldb (Linux/macOS) documentation

### Rules
- DDD strategic design is REQUIRED (not optional). Domain document with context maps + aggregate design must be produced before coding.
- Decision-maker MUST align requirements before routing (4-round dialogue for ambiguous requests).

## 1.0.0 (2026-05-28)

Initial release. Synthesized from [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan), [dotnet/skills](https://github.com/dotnet/skills), and [dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit).

### Skills (14)

| Category | Skills |
|----------|--------|
| Gateway | `using-dotnet`, `dotnet-advisor` (the decision-maker) |
| Baseline | `dotnet-csharp` (always loaded) |
| Builders | `dotnet-api`, `dotnet-ui` |
| Verifiers | `dotnet-testing`, `dotnet-debugging`, `dotnet-quality` |
| Operators | `dotnet-devops`, `dotnet-tooling`, `dotnet-upgrade` |
| Augmenters | `dotnet-ai`, `dotnet-workflow`, `dotnet-learning` |

### Agents (17)

**Role-based (6)**: `dotnet-architect`, `dotnet-code-review-agent`, `dotnet-security-reviewer`, `dotnet-testing-specialist`, `dotnet-docs-generator`, `dotnet-refactor-cleaner`

**Tool-based (10)**: `dotnet-aspnetcore-specialist`, `dotnet-async-performance-specialist`, `dotnet-benchmark-designer`, `dotnet-blazor-specialist`, `dotnet-build-error-resolver`, `dotnet-cloud-specialist`, `dotnet-csharp-concurrency-specialist`, `dotnet-maui-specialist`, `dotnet-performance-analyst`, `dotnet-uno-specialist`

**Workflow (1)**: `dotnet-pr-workflow` — full PR lifecycle: create → validate → review → merge → release

### Guides

`USAGE.md` (questioning framework, domain-driven analysis), `SELF_DOCUMENTING.md` (30-second rule), `BEHAVIORS.md` (30+ behavior catalog), `CLAUDE.md` (context reconnection), `harness/` (drop-in auto-pilot config)

### Key Rules

- No Repository/UoW wrappers — DbContext directly
- No FluentValidation — `AddValidation()` + DataAnnotations on .NET 10+
- No commercial packages — free/open-source only
- No DateTime.Now — `TimeProvider` everywhere
- Self-documenting code — 30-second rule for AI reconnection
- Question before coding — domain glossary first
- English-only skills/agents, bilingual docs
