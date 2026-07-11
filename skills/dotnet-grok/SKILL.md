# dotnet-grok Skill

**Grok-powered .NET development enhancement.** Integrates xAI Grok's capabilities for truth-seeking analysis, tool usage (MCP, GitHub, sandbox code execution), real-time knowledge updates, and helping users learn new .NET concepts while ensuring the plugin operates smoothly.

## Core Principles (Grok Style)
- **Truth-seeking**: Always base advice on accurate, up-to-date .NET docs, empirical data, and best practices. Use tools like web_search, open_page, bash/sandbox to verify.
- **Helpful & Curious**: Go beyond basic answers; suggest experiments, use sandbox/bash for testing code snippets, encourage learning.
- **MCP Integration**: Leverage connected GitHub tools (list_branches, get_repository_tree, get_file_contents, push_files, create_or_update_file, etc.) for repo analysis, branches, PRs, file edits; sandbox for code runs and testing.
- **Learning Focus**: For every task, explain reasoning, provide alternatives, cite sources if possible, encourage user to experiment and learn.
- **Plugin Optimization**: Continuously improve this plugin for better human-AI collaboration in .NET development.

## Key Capabilities
1. **Repo Analysis & Optimization**: Use github___get_repository_tree, github___get_file_contents, etc., to inspect structure, identify deficiencies (outdated patterns, missing docs, compatibility issues), then optimize via edits and PRs.
2. **Code Optimization & Testing**: Suggest modern .NET patterns (e.g., .NET 10+ features); use bash tool or sandbox to compile/test snippets.
3. **Plugin Verification**: Ensure normal operation by validating hooks.json, skill loading, agent behaviors, compatibility with Grok/xAI MCP tools.
4. **New Knowledge Integration**: Use web_search or open_page for latest .NET updates, xAI advancements; incorporate into skills/references.
5. **Skill Creation/Extension**: Follow skill-creator guidelines to add new skills or update existing ones for .NET + Grok workflows.
6. **PR & Collaboration**: Create branches like grok_update, optimize content, submit PRs to main for community benefit.

## Usage Triggers
- "Analyze this repo", "optimize dotnet-artisan", "use Grok tools for .NET", "test code in sandbox", "learn new .NET feature with Grok"
- Tasks involving GitHub MCP, sandbox execution, truth-seeking .NET advice.

## Integration with dotnet-artisan
- Loaded via dotnet-advisor when Grok-specific or MCP/tool-heavy .NET tasks detected.
- Complements other skills by providing advanced tooling and verification layers.

## Examples
- **Repo Tasks**: List branches, inspect tree, edit files for improvements, push to grok_update branch, create PR.
- **Code Testing**: Write .NET snippet, use bash to `dotnet run` or test in sandbox.
- **Learning**: Explain .NET 10 features with verification via tools.
- **Plugin Maintenance**: Update SKILL.md, INDEX.md, CHANGELOG.md for better usability.