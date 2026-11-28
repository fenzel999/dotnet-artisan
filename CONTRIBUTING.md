# Contributing to dotnet-artisan

Thank you for helping humans use this plugin, keeping it runnable, and teaching it new .NET knowledge.

## Ground rules

1. **Additive, non-breaking.** Zero-config install must keep working. Do not move `hooks/hooks.json` or break auto-discovery of `skills/` and `agents/`.
2. **English for skills and agents.** User-facing docs may be bilingual (`README.md` / `GUIDE.md` Chinese, `README.en.md` / `GUIDE.en.md` English).
3. **Reference files belong under `skills/<skill>/references/`.** Human guides belong at the repo root.
4. **Wait for human review** on PRs targeting `main`. Do not auto-merge unless the maintainer asks.

## Local checks before a PR

```bash
# JSON must parse
python -c "import json; json.load(open('.claude-plugin/plugin.json')); json.load(open('.claude-plugin/marketplace.json')); json.load(open('hooks/hooks.json'))"

# Every skill directory needs SKILL.md
find skills -mindepth 1 -maxdepth 1 -type d -exec test -f '{}/SKILL.md' \; -print

# Hook scripts must be valid Node
node --check scripts/hooks/session-start-context.js
node --check scripts/hooks/user-prompt-dotnet-reminder.js
node --check scripts/hooks/check-self-doc.js
```

## Adding a skill

1. Create `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`).
2. Put agent-facing companions in `skills/<name>/references/`.
3. Update `skills/INDEX.md`, README skill tables (zh + en), and marketplace copy if counts change.
4. Keep routing through `using-dotnet` → `dotnet-advisor`. Do not replace the decision-maker.

## Adding an agent

1. Add `agents/<name>.md` with official frontmatter only (`name`, `description`, optional `model`, `tools`, `skills`).
2. `plugin.json` already points at `./agents/` so new files are auto-discovered.
3. Update `AGENTS.md` and README agent tables.

## Learning new knowledge

When you discover a durable .NET pattern:

1. Deduplicate against `skills/CHEATSHEET.md` and `skills/DECISIONS.md`.
2. Prefer a short addition to an existing reference over a new skill.
3. Use `dotnet-learning-agent` + `dotnet-grok` for session memory, then promote stable rules into references.

## PR checklist

Use `.github/PULL_REQUEST_TEMPLATE.md`. Target `main` from a topic branch (for Grok work, reuse `grok_update`).
