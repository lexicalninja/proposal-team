# Proposal Team

A multi-agent team for writing and reviewing federal government procurement proposals. Specialized agents cover compliance review, solution architecture, past performance, growth strategy, and subject matter expertise.

Ships as **two surfaces** that share one set of agents, skills, and templates:

| Surface | Runs in | Entry point |
|---|---|---|
| **Claude Code plugin** | Claude Code | skills + agents |
| **VS Code extension** | Copilot Chat | `@proposal-team` |

## Installation (Claude Code plugin)

### From Plugin Marketplace

```
/plugin marketplace add lexicalninja/my-marketplace
/plugin install proposal-team@my-marketplace
```

### From GitHub

```
/plugin install https://github.com/lexicalninja/proposal-team
```

### Local Development

```bash
claude --plugin-dir ./path-to-this-repo
```

## VS Code extension

See [packages/proposal-team-vscode](./packages/proposal-team-vscode/README.md).

```bash
cd packages/proposal-team-vscode
npm ci
npm run compile
npx @vscode/vsce package
```

Release tags use the form `proposal-team-extension/v*`.

## Repository Layout

```
.claude-plugin/                 Plugin manifest
agents/                         Agent definitions (5)
skills/                         Skill definitions (6)
templates/                      Proposal templates
writing-standards.md            Shared writing standards
packages/proposal-team-vscode/  VS Code Copilot Chat participant
```

`skills/` and `templates/` exist exactly once and feed every surface — see [CLAUDE.md](./CLAUDE.md).

## Agent Team

| Agent | Focus |
|---|---|
| Growth Strategist | Win themes, discriminators, competitive positioning |
| Solution Architect | Solution coherence, staffing, technology alignment |
| Subject Matter Expert | Technical correctness, methodology, feasibility |
| Compliance Reviewer | Requirements coverage, Section L/M traceability |
| Past Performance Specialist | Relevance, STAR narratives, CPARS context |

## License

MIT
