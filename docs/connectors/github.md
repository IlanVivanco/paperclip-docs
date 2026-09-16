---
seo_title: GitHub Connector
seo_description: Two separate GitHub setups: repository tools for agents, or people working with an agent from issues. Includes the shell Git and gh exception.
---

# GitHub

GitHub does two unrelated jobs in Paperclip, and they are separate connections with separate credentials.

## Which do you want?

| If you want | Set up | What it gives you |
| --- | --- | --- |
| Agents to read and act on repositories as part of their own work | **Use this connection as an agent tool** | GitHub actions an agent can call, and for a managed identity the credential the run's shell uses |
| People to start and continue work by commenting in GitHub | **Chat with an agent** | A GitHub App that turns issue and pull-request comments into Paperclip tasks |

Connecting one does not connect the other. [Set up the GitHub connector](github-setup.md) is the step-by-step procedure for both.

Before you give an agent a GitHub identity, read the shell exception — it is the boundary most often misread.

## The shell exception

Paperclip's per-action **Allowed** / **Ask first** / **Off** switches govern tool calls that go through Paperclip's tool gateway. When a GitHub connection is bound to an agent as a dedicated identity, that same identity is also handed to the agent's workspace shell, and shell commands do not go through the gateway.

Paperclip states this when you change a GitHub permission:

> **Danger:** Shell Git and `gh` use this account for the run and are not constrained by per-tool Ask-first controls.

Three things this does **not** mean:

- **It is not a claim about other connectors, in either direction.** This warning is about shell Git and `gh` on this connection. It says nothing about how any other connector behaves, and you should not read it as a promise that everything else is confined to the gateway — model-provider connections supply a credential rather than making tool calls at all, and messaging channels carry conversation over their own transport. [How connector access works](access-model.md) sets out which controls apply to which kind of connection.
- **It is not a claim that the agent is unrestricted.** The ceiling is whatever the GitHub account can do: the repositories selected on the installation, and that account's permissions on them. Narrow the account, not the switches.
- **Human approval is not code review.** An approved **Ask first** call means a person said yes to one API call. A pull request review is a separate control, on GitHub, done by a reviewer. Neither substitutes for the other.

The practical consequence: for an agent that will push code, the limits that matter are GitHub-side — selected repositories, branch protection, required reviews — not Paperclip's per-tool switches.

---

## GitHub as an agent tool

### Choose a credential

| Path | When to use it | Availability |
| --- | --- | --- |
| **Use this connection as an agent tool** | The default. Paperclip manages the GitHub App authorization, and the identity is also available to shell Git and `gh` | Only when the instance is enrolled with Paperclip Cloud and Cloud advertises the GitHub connector profile |
| **Personal access token (advanced)** | No Cloud enrollment, or you want a token you control directly | Always |

The two are not equivalent. A fine-grained personal access token carries the permissions you select on the token. The managed path's permissions come from the GitHub App registration and the repositories chosen on the installation — GitHub returns no OAuth scope list for it, so there is no scope string to inspect. If you need to reason precisely about permissions, a fine-grained token is easier to audit; if you need a durable identity for shell work, the managed path is the one that provides it.

### Choose an identity

The managed path offers three, and the difference shows up in GitHub's own audit trail:

| Setup choice | Effect |
| --- | --- |
| **My GitHub account** | *"Every agent may use your GitHub when you're responsible."* Choose **Only agents I choose** to narrow it |
| **Dedicated GitHub account** | *"That agent always uses this account, regardless of who starts the run."* Commits and comments are attributable to the agent |
| **Shared company GitHub account (advanced)** | One organization-wide account |

A dedicated agent identity is the right choice when you want agent commits distinguishable from a person's. Creating one is a manager operation: *"Only connection managers can authorize a dedicated agent identity."*

### Repository access

Repository scope is set in GitHub, not in Paperclip. The connection's identity card reflects the installation:

- **Accessible GitHub repositories** lists the selected repositories, or shows **All current and future repositories** for an org-wide installation.
- **Add More Repos on GitHub** and **Configure access on GitHub** link into GitHub's installation settings.
- **Refresh access** re-reads the installation after you change it there.

Prefer selected repositories. An installation granting all current and future repositories is flagged in the repository row, because it silently widens as the organization grows.

### Actions

GitHub's hosted server supplies the action list, so Paperclip does not ship a frozen copy. Read the live list on the connection's **Permissions** tab and use **Refresh actions** after GitHub changes it.

What happens to an action GitHub adds depends on which credential path you took. On the **managed** path new and changed actions are held back until you turn them on. On a **personal access token** connection they become active under the policies already in force — so review the list after a refresh rather than assuming it can only narrow. [Set action permissions](action-permissions.md) has the full rule.

Actions are classified read, write, or destructive and can be set **Allowed**, **Ask first**, or **Off** — remembering what those settings do and do not bound. See [Set action permissions](action-permissions.md).

### Try it

Use a read. Listing the repositories the installation can reach is a good first check because it confirms the credential and shows you the scope at the same time:

```txt
List the GitHub repositories you can access, and tell me how many there are.
```

Compare the list against the installation's settings on GitHub. Do not verify with a push, a pull request, or a merge.

> **Note:** Illustrative task, not a recorded test result.

---

## GitHub as a channel

People comment in an issue or pull request, mentioning the agent, and Paperclip creates a task.

### Before you connect

- **Chat connectors** must be switched on for the instance. It is an experimental setting, off by default, enabled by an instance administrator under experimental settings.
- Permission to create a GitHub App in the organization, and to install it.
- The agent that will answer.

### What it needs

You create one private GitHub App for this — with **Issues** and **Pull requests** read and write permission, the **issue_comment** and **pull_request_review_comment** events, and a webhook secret Paperclip generates — then give Paperclip its **App ID** and **private key (PEM)**. [Set up the GitHub connector](github-setup.md) has the numbered procedure.

This route grants no repository tools. An agent reachable from issue comments cannot call GitHub actions unless you also set up the tool connection.

### Access

Reach is decided by where the App is installed. Anyone who can comment on an issue or pull request in an installed repository can start agent work, so repository selection is the control.

### Try it

1. In a repository where the App is installed, open a scratch issue.
2. Comment, mentioning the agent, and ask it to confirm it is connected.
3. Expect a reply comment and a matching task in Paperclip.

> **Note:** Procedure, not a recorded test result. Use a scratch repository or issue.

---

## Not the same as the workspace git setup

[Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md) is a different job: pointing a project workspace at a remote, and matching Paperclip's review stage to GitHub's. That page remains the right one for the git and `gh` workflow itself. This connector is how the credential gets there. Use both.

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| **Use this connection as an agent tool** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the GitHub profile | Use **Personal access token (advanced)** |
| **Chat with an agent** is not offered | **Chat connectors** is off for the instance | Ask an administrator to enable it |
| The agent sees fewer repositories than expected | The installation does not include them | **Add More Repos on GitHub**, then **Refresh access** |
| *"You don't have permission to reconnect this identity."* | The identity belongs to another person or agent | Ask its owner, or use your own |
| Tool calls succeed but shell `git push` fails | The account's repository permissions, or branch protection | Check both on GitHub |
| Comments do not create tasks | The App is not installed on that repository, or the events are not selected | Install it there and confirm the two comment events |
| Webhook deliveries fail in GitHub | The webhook secret or URL does not match | Regenerate the secret in Paperclip and update the App |
| **Needs attention** | The token expired or the installation was removed | Select **Reconnect** |

## Limitations

The two routes are independent. Repository scope lives in GitHub on both. The managed tool path depends on Cloud enrollment; the channel path depends on the experimental chat setting. Paperclip cannot constrain shell Git or `gh` with per-action settings.

## Related guides

- [Set up the GitHub connector](github-setup.md)
- [Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md)
- [Slack](slack.md) — the other mixed-purpose connector.
- [How connector access works](access-model.md)
- [Use separate accounts for people and agents](separate-accounts.md)
