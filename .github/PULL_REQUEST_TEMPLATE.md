## Description

<!-- Describe what this PR changes and why. Include the motivation behind the change. -->

## Related Issue

<!-- Link to the issue this PR addresses (if applicable) -->
Closes #

## Type of Change

- [ ] Bug fix (incorrect content, broken links, stale reference counts)
- [ ] New feature (new skill, agent, or reference file)
- [ ] Enhancement (improvement to existing content)
- [ ] Documentation update
- [ ] Infrastructure (CI/CD, hooks, config)

## Self-Review Checklist

<!-- Verify each box -- if any don't apply, explain why -->

### Content Quality
- [ ] All new `.md` files follow the format: Core Principles → Patterns → Anti-patterns → Decision Guide
- [ ] No commercial package recommendations without free alternatives
- [ ] Version-specific guidance is clearly marked (net8.0 vs net9.0 vs net10.0+)
- [ ] Code examples use BAD/GOOD or AVOID format where applicable
- [ ] Reference counts in SKILL.md / INDEX.md are accurate

### Consistency
- [ ] New skills/agents are registered in `plugin.json`
- [ ] New reference files are listed in `INDEX.md`
- [ ] Relevant SKILL.md routing tables are updated
- [ ] README.md / README.en.md updated if user-facing change

### Technical
- [ ] Hook scripts output valid JSON on all exit paths
- [ ] No secrets or hardcoded credentials
- [ ] No breaking changes to existing behavior

## How Has This Been Tested?

<!-- Describe how you verified these changes work -->
- [ ] Built/tested locally
- [ ] Verified with `dotnet build` (if .NET code changed)
- [ ] Content review only (markdown changes)

## Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## Additional Context

<!-- Any additional information that reviewers should know -->
