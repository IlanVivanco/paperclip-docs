---
seo_title: GitHub Connector
seo_description: The GitHub connector gives agents repository tools and, for a dedicated identity, the account that shell Git and gh use for the whole run.
---

# GitHub

Give agents repository tools or let people work with an agent from GitHub issues and pull requests.

GitHub is the connector with the widest reach, and the one whose enforcement boundary is most often misread. Read the exception below before you grant an agent a dedicated GitHub identity.

For the setup procedure, see [Set up the GitHub connector](github-setup.md).

## What this connector does

| Property | Value |
| --- | --- |
| Catalog slug | `github` |
| Category | Developer tools |
| Transport | `mcp_remote` (agent tool), `chat_sdk` (chat) |
| MCP server | `https://api.githubcopilot.com/mcp/` |
| Connector profile | `github.code` |
| Risk tier | S3 |
| Required resource filters | `organization`, `repository` |

Two unrelated purposes live under one catalog entry:

- **Agent tool** (`purpose: tool`) — repository tools an agent calls, plus, for a managed identity, the credential the run's shell uses.
- **Chat** (`purpose: channel`) — people talking to an agent from GitHub issues, pull requests, and review threads. This is behind the **Chat connectors** instance flag, which is off by default.

## The shell exception

This is the part to get right.

Paperclip's per-action **Allowed / Ask first / Off** switches govern tool calls that go through Paperclip's tool gateway. When a GitHub connection is bound to an agent as a dedicated identity, that same identity is also handed to the agent's workspace shell — and shell commands do not go through the gateway.

Paperclip says this at the moment you change a GitHub permission:

> **Danger:** Shell Git and gh use this account for the run and are not constrained by per-tool Ask-first controls.

The catalog states the same thing about the managed method: *"Shell Git and gh receive this identity for the run and are not constrained by per-tool Ask-first controls."*

Three things this does **not** mean:

- **It is not a claim that other connectors are sandboxed.** Every other connector's calls go through the gateway and obey their action settings. This is a statement about shell Git and `gh` specifically, not a general sandbox guarantee in either direction.
- **It is not a claim that the agent is unrestricted.** The ceiling is whatever the GitHub account can do: the repositories selected on the installation, and that account's permissions on them. Narrow the account, not the switches.
- **Human approval is not code review.** An approved **Ask first** tool call means a person said yes to one API call. A pull request review is a separate control, on GitHub, done by a reviewer. Neither substitutes for the other. If merges matter, protect the branch on GitHub.

The practical consequence: for an agent that will push code, the meaningful limits are GitHub-side — selected repositories, branch protection, required reviews — not Paperclip's per-tool switches.

## Setup paths

| Method | Auth | Ownership | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `managed` — **Use this connection as an agent tool** | OAuth | Paperclip-managed client (`paperclip_cloud_connector`) | tool | Grant kinds: `user`, `agent`. Durable MCP, shell Git, `gh`, and repository access. |
| `mcp-key` — **Personal access token (advanced)** | API key | Yours | tool | Field **GitHub token**, sent as `Authorization: Bearer …`. Use a fine-grained token limited to the repositories agents should use. |
| `chat-agent` — **Chat with an agent** | API key | Yours | channel | A GitHub App: **App ID** and **private key**. Behind the **Chat connectors** flag. |

The managed path appears only when your instance is enrolled with Paperclip Cloud and Cloud advertises the `github.code` profile. Without enrollment, the personal access token path is the supported route for agent tools.

GitHub returns an empty OAuth scope string for user-to-server tokens. Permissions come from the GitHub App registration and the repositories chosen on the installation, not from a scope list Paperclip requests.

## Identities

The managed method accepts two grant kinds, and the difference is visible in GitHub's own audit trail.

| Setup choice | Grant | Effect |
| --- | --- | --- |
| **My GitHub account** | `user` | *"Every agent may use your GitHub when you're responsible."* Or **Only agents I choose** to narrow it. |
| **Dedicated GitHub account** | `agent` | *"That agent always uses this account, regardless of who starts the run."* Commits and comments are attributable to the agent. |

Creating a dedicated agent identity is a manager operation: *"Only connection managers can authorize a dedicated agent identity."*

There is also a **Shared company GitHub account (advanced)** path for one organization-wide account.

## Repository access

Repository scope is set in GitHub, not in Paperclip. The connector's identity card shows what the installation currently grants:

- **Accessible GitHub repositories** with the selected list, or **All current and future repositories** when the installation is org-wide.
- **Add More Repos on GitHub** and **Configure access on GitHub**, which link into GitHub's installation settings.
- **Refresh access** re-reads the installation after you change it on GitHub.

An installation granting **All current and future repositories** is flagged in the repository row. Prefer selected repositories.

## Actions

The action list comes from GitHub's hosted MCP server, so Paperclip does not ship a frozen copy. Read the live list on the **Permissions** tab or with:

```http
GET  /api/tool-connections/{connectionId}/catalog
POST /api/tool-connections/{connectionId}/catalog/refresh
```

Actions are classified read, write, or destructive, and each can be set **Allowed**, **Ask first**, or **Off**. Newly discovered actions arrive switched off. Remember the shell exception when you reason about what those settings actually bound.

> **Note:** Any list of GitHub tool names in documentation is dated the moment GitHub changes its server. Use **Refresh actions** and read your own connection's catalog rather than trusting a table here.

## Authorization sequence

```txt
You             Paperclip               GitHub
|               |                       |
+--------------->                       |  Connect: POST /api/companies/{companyId}/tools/apps/connect
|               |                       |
|               +----------------------->  authorization request (GitHub App, paperclip_cloud_connector)
|               |                       |
+--------------------------------------->  authorize and choose repositories
|               |                       |
|               <-----------------------+  redirect with code
|               |                       |
|               +----------------------->  GET /api/tools/oauth/cloud-connector/callback, code to token
|               |                       |
+--------------->                       |  choose identity, agents, actions: POST .../tools/apps/{connectionId}/finish
|               |                       |
```

A run that needs the credential resolves it through the broker with a `github_credentials`-scoped capability bound to that heartbeat run. Browser sessions are refused on that route.

## Not the same as the workspace git setup

[Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md) is a different job: pointing a project workspace at a remote, giving the agent a credential to push, and matching Paperclip's review stage to GitHub's. That page stays the right one for the git and `gh` workflow itself.

The GitHub connector is how the credential gets there when it is managed by Paperclip. Use both: the connector for identity, the how-to for the workflow.

## Verify it safely

Run one read action — listing repositories for the connected installation is the cheapest — as the agent you intend to use. Do not verify with a push, a PR, or a merge.

## Troubleshooting

| What you see | What it means |
| --- | --- |
| **Use this connection as an agent tool** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the `github.code` profile. Use a fine-grained token. |
| The agent sees fewer repositories than expected | The installation does not include them. Use **Add More Repos on GitHub**, then **Refresh access**. |
| *"You don't have permission to reconnect this identity."* | The identity belongs to another person or agent. |
| Tool calls succeed but shell `git push` fails | Repository permissions on the account, or branch protection. Check on GitHub. |
| **Needs attention** | The token expired or the installation was removed. Select **Reconnect**. |

## Related

- [Set up the GitHub connector](github-setup.md)
- [Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md)
- [How connector access works](access-model.md)
- [Use separate accounts for people and agents](separate-accounts.md)
- [Set action permissions](action-permissions.md)
