# Knowledge capture template

Use this shape in the user project's `MEMORY.md`. One bullet per rule. Do not store secrets, connection strings, or customer data.

```markdown
## Code Style
- Use file-scoped namespaces in new C# files — matches existing repo style (source: user-convention, 2026-10-03)

## Data Access
- Inject TimeProvider instead of calling DateTime.UtcNow — keeps handlers testable (source: user-correction, 2026-10-03)

## Tooling / Grok
- Confirm new runtime APIs against learn.microsoft.com before recommending them — avoids stale training data (source: official-docs, 2026-10-03)
```

## Fields

- Category: Code Style, Architecture, Naming, Data Access, API Design, Testing, Configuration, Performance, Tooling / Grok
- Rule: imperative, class-level, one sentence
- Reason: why the rule exists
- Source: `user-convention` | `user-correction` | `official-docs` | `build-verified`
- Date: ISO date of capture

## Promotion checklist

Promote into this plugin only when all are true:

1. The rule is not specific to one product name, tenant, or folder.
2. A reference file already covers the topic, or a new reference is justified.
3. The change is proposed in a PR against `main` and left for human review.
