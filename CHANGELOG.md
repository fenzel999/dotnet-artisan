# Changelog

## Unreleased — Grok Optimizations (2026-07-29)

### Fixed / Improved
- **CLAUDE.md consistency**: Updated skill count 11→12, added `dotnet-grok` to file map, fixed INDEX reference (173→174), corrected hooks path to `hooks/hooks.json`, added Grok additive rule.
- **plugin.json**: Bumped version `1.0.2` → `1.0.3`, expanded description to mention Grok (xAI) and zero-config decision-maker.

### Goals (unchanged)
1. Help humans use this plugin effectively.
2. Ensure the plugin can run normally (hooks/skills/agents additive).
3. Help the project learn new knowledge via Grok MCP tools.

## Unreleased — Grok Optimizations (2026-07-28)

### Fixed / Improved
- **Skill count consistency**: Updated README.md / README.en.md / marketplace.json from 11 → **12 skills** to include `dotnet-grok`.
- **English README parity**: Synced README.en.md with Grok/xAI notes, verification checklist, and skills table (including `dotnet-grok`).
- **Human usability**: Clear install + “does the plugin run?” verification steps in both languages.
- **Learning path**: `dotnet-grok` + `dotnet-ai` + `dotnet-learning-agent` documented for capturing new .NET + MCP knowledge without breaking zero-config behavior.

### Goals (unchanged)
1. Help humans use this plugin effectively.
2. Ensure the plugin can run normally (hooks/skills/agents additive).
3. Help the project learn new knowledge via Grok MCP tools.

## Unreleased — Grok Optimizations (2026-07-26)

### Improved
- **Restored full high-quality README.md and CHANGELOG.md** from main (previous Grok branch had accidentally truncated them).
- **Enhanced README** with clear Grok/xAI compatibility notes, plugin verification steps, and human-usability guidance.
- **dotnet-ai skill** fully updated with proper xAI Grok integration patterns, MCP tool usage examples for Grok sandbox/GitHub MCP, and learning pathways. No more truncated placeholders.
- **Plugin running assurance**: Added explicit verification checklist and zero-config guarantees for Grok + Claude Code environments.
- **Learning support**: Emphasized `dotnet-learning-agent` + MCP tools for capturing new .NET knowledge into skills/references.

### Goal alignment
- Help humans use the plugin effectively (clear install, verify, scenario examples).
- Ensure the plugin runs normally (hooks, skills, decision-maker intact).
- Help the project learn new knowledge (Grok MCP patterns, modern AI/.NET integration).

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
