# dotnet-grok Skill

**Grok-powered .NET development enhancement.** Integrates xAI Grok's capabilities for truth-seeking analysis, tool usage (MCP, GitHub, sandbox code execution), real-time knowledge updates, and helping users learn new .NET concepts while ensuring the plugin operates smoothly.

## Core Principles (Grok Style)
- **Truth-seeking**: Always base advice on accurate, up-to-date .NET docs, empirical data, and best practices. Use tools like web_search, open_page, bash/sandbox to verify.
- **Helpful & Curious**: Go beyond basic answers; suggest experiments, use sandbox/bash for testing code snippets, encourage learning.
- **MCP Integration**: Leverage connected GitHub tools (list_branches, get_repository_tree, get_file_contents, create_or_update_file, etc.) for repo analysis, branches, PRs, file edits; sandbox for code runs and testing.
- **Learning Focus**: For every task, explain reasoning, provide alternatives, cite sources if possible, encourage user to experiment and learn.
- **Plugin Optimization**: Continuously improve this plugin for better human-AI collaboration in .NET development.

## Key Capabilities
1. **Repo Analysis & Optimization**: Use github tools to inspect, identify deficiencies (e.g., outdated references, missing Grok integration), optimize via edits.
2. **Code Optimization & Testing**: Suggest modern .NET 10+ features (current LTS .NET 10); use bash/sandbox to verify.
3. **Plugin Verification**: Validate hooks, skills, agents for Grok MCP compatibility.
4. **New Knowledge**: Integrate latest .NET via searches (e.g., .NET 11 previews).
5. **Skill Enhancement**: Update INDEX.md, add references as needed.

## Recent Optimizations
- Enhanced for GitHub MCP usage in this very workflow.
- Updated README, CHANGELOG, and INDEX.md references.
- Added support for .NET 10/11 knowledge.

Triggers: Grok-related .NET tasks, repo maintenance, plugin improvements.