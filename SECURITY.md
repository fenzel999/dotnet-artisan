# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.1.x   | ✅ Active development |
| 1.0.x   | ✅ Bug fixes only |

## Reporting a Vulnerability

This plugin contains AI agent instructions for .NET development. While it doesn't execute code directly, vulnerabilities could take the form of:

- **Unsafe coding patterns** in reference files that could lead AI agents to generate insecure code
- **Outdated API guidance** that references deprecated or removed APIs
- **Incorrect security guidance** in security-related reference files

### How to Report

If you find a security-relevant issue:

1. **Do not** open a public GitHub issue for urgent security concerns
2. Email the maintainer at [fenzel@example.com](mailto:fenzel@example.com) or open a standard issue for non-urgent matters
3. Include the specific file, line, and the recommended fix
4. For unsafe code patterns, include a brief explanation of why it's unsafe

### What to Expect

- Acknowledgment within 48 hours
- Resolution timeline based on severity:
  - **Critical** (unsafe code generation): Fixed within 7 days
  - **High** (outdated API guidance): Fixed within 14 days
  - **Medium** (documentation gaps): Fixed within 30 days
  - **Low** (minor improvements): Next release

## Security Best Practices (for contributors)

When writing or reviewing reference files:

- **Prefer parameterized queries** over string concatenation in all SQL examples
- **Use `TimeProvider`** instead of `DateTime.Now` for time operations
- **Use `IHttpClientFactory`** instead of `new HttpClient()`
- **Show complete validation** in auth examples (Issuer + Audience + Lifetime + SigningKey)
- **Never hardcode secrets** in examples — use `user-secrets`, `KeyVault`, or environment variables
- **Mark dangerous patterns** with an explicit "NEVER" or "AVOID" heading
