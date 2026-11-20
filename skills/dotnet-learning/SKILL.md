---
name: dotnet-learning
license: MIT
user-invocable: true
description: >
  Capture corrections and verified .NET facts into reusable project knowledge.
  Use when the user says remember, always, never, do not do that, save this rule,
  or when a build, test, or official doc confirms a new pattern worth keeping.
  Routes durable rules to MEMORY.md and promotes cross-project rules into skill references.
---

# dotnet-learning

Turn one-off corrections into rules the next session can follow. This skill is the human-facing entry for the learning loop used by `dotnet-learning-agent`.

## When to load

- User corrects output: "no, use X", "we never do that", "always Y".
- User asks to remember a convention.
- A `dotnet build` / `dotnet test` or official doc confirms a fact the plugin did not already encode.
- A repeated agent mistake appears in the same repository.

Do not load for a one-line typo fix that has no reusable pattern.

## Capture flow

1. Detect the signal (correction, explicit remember, or verified fact).
2. Generalize to a class-level rule. "Use TimeProvider in CreateOrder" becomes "Use TimeProvider instead of DateTime.Now / DateTime.UtcNow".
3. Search `MEMORY.md` (user project) and `skills/CHEATSHEET.md` for a duplicate. Update the existing rule instead of appending a twin.
4. Write the rule with a reason and a source. Format is in `references/capture-template.md`.
5. Confirm to the user: the rule text, where it was stored, and when it applies.
6. Promote only if the rule is true for more than this repository. Propose a short addition under the matching `skills/*/references/` file and wait for review before treating it as plugin-wide.

## Verification bar

Store a "new .NET feature" only when one of these is true:

- Official docs (learn.microsoft.com, NuGet package readme, or release notes) were read in this session.
- A local `dotnet build` or `dotnet test` passed against the pattern.
- The user stated it as a project convention (mark source as `user-convention`, not `platform-fact`).

If none of those hold, ask before writing the rule.

## Where knowledge lives

| Scope | Location | Who writes it |
| --- | --- | --- |
| This repository only | `MEMORY.md` at the user project root | learning agent or the user |
| Plugin-wide, after review | matching `skills/*/references/*.md` | human-reviewed PR |
| Session cheat sheet | `skills/CHEATSHEET.md` | only for rules every .NET session should see |

## Related

- Agent: `agents/dotnet-learning-agent.md`
- Grok verification path: [skill:dotnet-grok]
- Workflow memory section: [skill:dotnet-workflow]
