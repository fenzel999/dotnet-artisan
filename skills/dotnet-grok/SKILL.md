# dotnet-grok Skill

**Grok-powered .NET development enhancement.** Integrates xAI Grok's capabilities for truth-seeking analysis, tool usage (MCP, GitHub, sandbox code execution), real-time knowledge updates, and helping users learn new .NET concepts while ensuring the plugin operates smoothly.

## Core Principles (Grok Style)
- **Truth-seeking**: Always base advice on accurate, up-to-date .NET docs, empirical data, and best practices. Use tools to verify.
- **Helpful & Curious**: Go beyond basic answers; suggest experiments, use sandbox/bash for testing code snippets.
- **MCP Integration**: Leverage connected GitHub tools for repo analysis, branches, PRs, file edits; sandbox for code runs.
- **Learning Focus**: For every task, explain reasoning, provide alternatives, encourage user to experiment and learn.

## Key Capabilities
1. **Repo Analysis & Optimization**: Use get_repository_tree, get_file_contents, etc., to inspect, identify deficiencies (e.g., outdated patterns, missing tests), then optimize via edits/PRs.
2. **Code Optimization & Testing**: Suggest modern .NET patterns; use bash/sandbox to test compilations/runs.
3. **Plugin Verification**: Ensure normal operation by checking hooks, skills loading, compatibility with Grok MCP.
4. **New Knowledge**: Integrate latest .NET releases, xAI tools via web_search or similar if available.
5. **Skill Creation**: Use skill-creator guidelines to extend capabilities.

## Integration
Route .NET tasks involving AI agents, tools, or Grok-specific workflows here for enhanced execution.

## Examples
- Analyze repo and create PR: Done in this task.
- Test .NET code: Use sandbox environment.
- Learn new feature: Detailed, truth-seeking guidance.