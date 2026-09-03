# Changelog

## Unreleased — Grok Optimizations (2026-09-03)

### Analysis (this session)
- Re-analyzed `main` via GitHub MCP. Plugin on `main` is already structurally runnable: official `hooks/hooks.json` + 3 zero-block hook scripts, 11 skills, 14 agents, 174 references.
- Confirmed branch `grok_update` and open **PR #16** already exist. Did not recreate the branch or open a second PR.
- Remaining human/learning gap: `BEHAVIORS.md` on this branch still matched `main` and omitted Grok / knowledge-promotion routes; humans had QUICKSTART but no dedicated “teach the plugin” page.

### Added
- `LEARNING.md` — three-layer memory (MEMORY.md → shared skills → plugin maintenance) for humans.

### Updated
- `BEHAVIORS.md` — Level Up + routing examples for `dotnet-grok` and knowledge promotion.

Waiting for human review — do not auto-merge.

## Unreleased — Grok Optimizations (2026-09-01)

### Analysis (this session)
- Re-analyzed `main` via GitHub MCP. Plugin on `main` is already structurally runnable: official `hooks/hooks.json` + 3 zero-block hook scripts, 11 skills, 14 agents, 174 references.
- Confirmed branch `grok_update` and open **PR #16** already exist. Did not recreate the branch or open a second PR.
- Remaining gap: badge/table still said 174 refs while marketplace + INDEX already counted `knowledge-promotion.md` as 175. Humans also needed QUICKSTART in the README further-reading list.

### Fixed
- README / README.en / AGENTS / CLAUDE reference counts → **12 skills · 14 agents · 175 refs**.
- README further reading now includes [QUICKSTART.md](QUICKSTART.md).

Waiting for human review — do not auto-merge.
