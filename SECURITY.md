# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes |

This repository is a documentation and prompt-skill plugin. It does not ship a runtime service. Still:

- Never commit secrets, tokens, connection strings, or private keys.
- Hook scripts must stay **zero-block** (fail open) so they cannot lock a developer out of their project.
- Security review of generated .NET code is handled by the `dotnet-security-reviewer` agent (read-only).

## Reporting a vulnerability

Please open a private advisory on GitHub, or file an issue **without** pasting secrets:

- What file or hook is affected
- Expected vs actual behavior
- Whether user projects could be modified unexpectedly

We will treat reports that affect hook execution, secret leakage in examples, or unsafe default code patterns as high priority.
