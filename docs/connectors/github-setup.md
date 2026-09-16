---
seo_title: Set Up the GitHub Connector
seo_description: Step-by-step setup for both GitHub routes — repository tools with a managed identity or a fine-grained token, and the GitHub App for chat from issues.
---

# Set up the GitHub connector

Two separate procedures, because GitHub does two unrelated jobs. Pick the one you need:

- [Set up GitHub as an agent tool](#set-up-github-as-an-agent-tool) — agents read and act on repositories.
- [Set up chat from GitHub](#set-up-chat-from-github) — people work with an agent from issue and pull-request comments.

For what each route governs, and the shell Git and `gh` exception, see [GitHub](github.md). Read the exception before granting an agent a dedicated identity.

## Set up GitHub as an agent tool

### 1. Decide the identity first

Deciding *which* identity and *which* repositories is the part worth slowing down for, because GitHub-side scope is the real limit on what an agent can do.

| Identity | Choose it when |
| --- | --- |
| **My GitHub account** | You want an agent acting as you, on your work, while you are the responsible person |
| **Dedicated GitHub account** | The agent should appear as itself in commits, comments, and pull requests. Requires the connection-manager permission |
| **Shared company GitHub account (advanced)** | There is a real shared bot account and one place to revoke it |

For anything that pushes code, a dedicated account is the better answer. Its actions are attributable, and revoking it does not disturb a person's own access.

### 2. Connect

Setup asks for access first, then the credential.

1. Select **Connectors** in the sidebar.
2. Find **GitHub** and select **Connect**.
3. On the **Access** step, choose which agents may use the connection: **Any agent**, or **Just agents I pick**. For a dedicated identity this is already settled — that agent owns the account.
4. Choose the credential path:
   - **Use this connection as an agent tool** — Paperclip's managed GitHub App. Offered only when the instance is enrolled with Paperclip Cloud and Cloud advertises the GitHub connector profile.
   - **Personal access token (advanced)** — paste a fine-grained token in the **GitHub token** field. Limit the token to the repositories agents should use.
5. On the managed path, answer **Connect GitHub as** with the identity from step 1. For a dedicated account, Paperclip asks **Which agent owns this GitHub account?**
6. Select **Continue to GitHub** and authorize.

### 3. Choose repositories in GitHub

GitHub's installation screen, not Paperclip, decides repository scope.

Select the specific repositories the agent should reach. Avoid **All current and future repositories** unless that is genuinely the intent — Paperclip flags such an installation in the repository row, because it widens on its own as the organization grows.

Back in Paperclip, the identity card shows **Accessible GitHub repositories**. To change the list later use **Add More Repos on GitHub** or **Configure access on GitHub**, then **Refresh access** so Paperclip re-reads the installation.

### 4. Set the actions

On the **Permissions** tab, work down the list: reads **Allowed**; writes and destructive actions **Ask first** or **Off** until you have watched the agent work.

Paperclip shows the shell warning when you change a permission on a dedicated GitHub identity. Read it as written: shell Git and `gh` use that account and are not bounded by these switches.

### 5. Put the real guardrails on GitHub

Because the shell is not gated by action permissions, the controls that matter for an agent with push access live on GitHub:

- Grant the installation **selected repositories**, not all of them.
- Protect the default branch: require a pull request, and require a review from someone other than the agent.
- Require status checks to pass before merge.

Paperclip's [execution policy](../guides/power/execution-policy.md) can also require a review stage on the Paperclip issue, but a Paperclip review stage and a GitHub branch protection rule are separate controls. Set both if merges matter.

### 6. Verify with a read

As the agent you intend to use, ask it to list the repositories it can access and compare the result against the installation's settings on GitHub. That proves the identity resolves and the scope is what you chose.

Do not verify with a push, a pull request, or a merge.

## Set up chat from GitHub

This route lets people start and continue work from issue, pull-request, and review comments. It grants no repository tools — if you want both, complete both procedures.

### 1. Check the prerequisites

- **Chat connectors** must be switched on for the instance. It is an experimental setting, off by default, enabled by an instance administrator under experimental settings.
- You need permission to create a GitHub App in the organization and to install it.
- Decide which agent will answer.

### 2. Start in Paperclip and generate the webhook secret

1. Open **Connectors**, select **GitHub**, then **Chat with an agent**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Generate the webhook secret. Keep it to hand — GitHub needs it in the next step.

### 3. Create one private GitHub App

At [GitHub's new App form](https://github.com/settings/apps/new), create a **private** App with:

- **Webhooks** active and SSL verification enabled, using Paperclip's webhook URL and the secret from step 2.
- **Issues** — read and write.
- **Pull requests** — read and write.
- Subscribed events: **issue_comment** and **pull_request_review_comment**.

GitHub sends the installation and installation_repositories events automatically; you do not select those.

Then generate a private key and download the PEM file.

> **Danger:** The private key authenticates the whole App. Paste it only into Paperclip, and generate a replacement key in GitHub if it is ever exposed.

### 4. Install it only where mentions should work

Install the App on the specific repositories where people may mention the agent. Anyone who can comment on an issue or pull request in an installed repository can start agent work, so this list is the access control.

### 5. Finish in Paperclip

Paste the **GitHub App ID** and the **private key (PEM)**, choose the answering agent, and finish.

### 6. Verify with a scratch issue

1. In a repository where the App is installed, open a scratch issue.
2. Comment, mentioning the agent, and ask it to confirm it is connected.
3. Expect a reply comment and a matching task in Paperclip.

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| The managed tool option is missing | No Paperclip Cloud enrollment, or the GitHub connector profile is not advertised | Use **Personal access token (advanced)** |
| **Chat with an agent** is missing | **Chat connectors** is off for the instance | Ask an administrator to enable it |
| Fewer repositories than expected | The installation does not include them | Fix it on GitHub, then **Refresh access** |
| *"You don't have permission to reconnect this identity."* | The identity belongs to someone else, or to another agent | Ask its owner, or use your own |
| Tool calls work but `git push` is rejected | Account permissions or branch protection on GitHub | Check both on GitHub |
| Webhook deliveries fail in GitHub's App log | The webhook URL or secret does not match | Regenerate the secret in Paperclip and update the App |
| A comment creates no task | The App is not installed on that repository, or the two comment events are not subscribed | Install it there and check the events |

More in [Verify a connector and fix a broken one](verify-and-troubleshoot.md).

## Related guides

- [GitHub](github.md)
- [Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md)
- [Use separate accounts for people and agents](separate-accounts.md)
- [Set action permissions](action-permissions.md)
