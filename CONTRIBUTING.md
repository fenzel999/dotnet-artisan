# Contributing to dotnet-artisan

Thank you for contributing! This plugin helps AI coding agents write correct .NET code. Your contributions keep it growing.

## How to Contribute

### 1. Reporting Issues

- **Bug report**: Include the skill/agent name, what you expected, and what happened.
- **Feature request**: Describe the .NET pattern or capability you want to add.
- **Documentation fix**: Point out the exact file and line with the issue.

### 2. Adding a Skill

Skills are the core of this plugin. Each skill has:
- `skills/<name>/SKILL.md` — Skill instructions (under 500 lines)
- `skills/<name>/references/*.md` — Detailed reference files

**Steps to add a skill:**
1. Create `skills/<name>/SKILL.md` with YAML frontmatter (name, description, license, user-invocable)
2. Follow the standard format: Overview → Routing Table → Out of Scope → Detailed Sections → Quality Gate
3. Add reference files following: Core Principles → Patterns (GOOD code) → Anti-patterns → Decision Guide
4. Register in `.claude-plugin/plugin.json` under the `skills` array
5. Update `skills/INDEX.md` with the new reference files
6. If the skill is a domain skill, add routing entry to `skills/dotnet-advisor/SKILL.md`

### 3. Adding an Agent

Agents are specialist sub-sessions for deep analysis.

**Steps to add an agent:**
1. Create `agents/<name>.md` with YAML frontmatter (name, description, model)
2. Register in `.claude-plugin/plugin.json` under the `agents` array
3. Add trigger conditions to each applicable `SKILL.md` or `BEHAVIORS.md`

### 4. Pull Request Process

1. **Branch naming**: Use conventional commits prefixes:
   - `feat/` — new skill, agent, or reference file
   - `fix/` — bug fix, count correction, or documentation error
   - `refactor/` — restructuring without functional change
   - `docs/` — documentation only

2. **Before submitting**: Run through the quality checklist:
   - [ ] JSON files are valid (`.claude-plugin/plugin.json`, `hooks.json`)
   - [ ] All `SKILL.md` files are under 500 lines
   - [ ] Reference files follow the standard format
   - [ ] Counts in `CLAUDE.md`, `AGENTS.md`, `INDEX.md`, and `README.md` are consistent
   - [ ] New skills/agents are registered in `plugin.json`

3. **PR title**: Use conventional commits format:
   - `feat: add dotnet-xyz skill for ...`
   - `fix: correct agent count in CLAUDE.md`
   - `docs: update README with new examples`

4. **PR body**: Describe what changed and why. Include the motivation and any trade-offs considered.

### 5. Coding Standards (for .md files)

- English only in `skills/`, `agents/`, and `references/`
- Chinese + English supported in `README.md` and `docs/`
- Every reference file: Core Principles → Patterns → Anti-patterns → Decision Guide
- Use inline BAD/GOOD examples or dedicated Anti-patterns section
- WHY comments for non-obvious decisions only

### 6. Versioning

This plugin follows [SemVer](https://semver.org/):
- **Patch** (1.0.0 → 1.0.1): Documentation fixes, minor corrections, reference additions
- **Minor** (1.0.0 → 1.1.0): New skills, agents, or reference domains
- **Major** (1.0.0 → 2.0.0): Breaking changes to skill/agent structure or routing

Update `CHANGELOG.md` and `.claude-plugin/plugin.json` version with each release.

## Code of Conduct

Be respectful, constructive, and inclusive. This project is for learning and teaching .NET best practices.
