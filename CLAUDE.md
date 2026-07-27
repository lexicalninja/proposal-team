# Development Guide

This repo ships the proposal team through two surfaces that share one set of
agents, skills, and templates.

## Layout

```
agents/                         Agent definitions (Claude Code plugin)
skills/                         Skill definitions — SHARED
templates/                      Shared proposal templates
writing-standards.md            Shared writing standards
.claude-plugin/                 Plugin manifest
packages/proposal-team-vscode/  VS Code Copilot Chat participant
```

`agents/`, `skills/`, `templates/`, and `writing-standards.md` exist exactly
once at the repo root. The Claude Code plugin reads them in place.

`proposal-team-vscode` is the exception: a VS Code extension can only read
files inside its own directory, so `scripts/copy-resources.js` stages the
shared resources into a generated, gitignored `resources/` at build time.
The repo root stays the source of truth — nothing is edited in `resources/`.

## Surfaces

| | Claude Code plugin | VS Code (`packages/proposal-team-vscode`) |
|---|---|---|
| Runs in | Claude Code | Copilot Chat |
| Entry | skills + agents | `@proposal-team` chat participant |
