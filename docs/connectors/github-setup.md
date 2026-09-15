---
seo_title: Set Up the GitHub Connector
seo_description: Connect GitHub as your own account or as a dedicated agent identity, choose the repositories the installation covers, and keep merges behind review.
---

# Set up the GitHub connector

Connecting GitHub takes a couple of minutes. Deciding *which* identity and *which* repositories is the part worth slowing down for, because GitHub-side scope is the real limit on what an agent can do.

For what the connector governs and what it does not, see [GitHub](github.md) — in particular the shell exception.

## 1. Decide the identity first

| Identity | Choose it when |
| --- | --- |
| **My GitHub account** | You want an agent acting as you, on your work, while you are the responsible person. |
| **Dedicated GitHub account** | The agent should appear as itself in commits, comments, and pull requests. Requires the connection-manager permission. |
| **Shared company GitHub account (advanced)** | There is a real shared bot account and one place to revoke it. |

For anything that pushes code, a dedicated account is the better answer. Its actions are attributable, and revoking it does not disturb a person's own access.

## 2. Connect

1. Select **Connectors** in the sidebar.
2. Find **GitHub** and select **Connect**.
3. Choose the setup path:
   - **Use this connection as an agent tool** — Paperclip's managed GitHub App. Available only when the instance is enrolled with Paperclip Cloud and Cloud advertises the `github.code` profile.
   - **Personal access token (advanced)** — paste a fine-grained token in the **GitHub token** field. Limit the token to the repositories agents should use.
4. For the managed path, answer **Connect GitHub as** with the identity from step 1. For a dedicated account, Paperclip asks **Which agent owns this GitHub account?**
5. Select **Continue to GitHub** and authorize.

## 3. Choose repositories in GitHub

GitHub's installation screen, not Paperclip, decides repository scope.

Select the specific repositories the agent should reach. Avoid **All current and future repositories** unless that is genuinely the intent — Paperclip flags such an installation in the repository row because it is rarely what someone meant to pick.

Back in Paperclip, the identity card shows **Accessible GitHub repositories**. To change the list later, use **Add More Repos on GitHub** or **Configure access on GitHub**, then **Refresh access** so Paperclip re-reads the installation.

## 4. Choose which agents may use it

On the **Permissions** tab, under **Which agents can use this connection**:

- **Any agent** — every agent in the company may use it.
- **Just agents I pick** — name them.

For a dedicated identity the question is already answered: that agent owns the account.

For a personal identity, the two variants are *"Every agent may use your GitHub when you're responsible"* and *"Only agents I choose."* Pick the narrower one unless you have a reason not to.

## 5. Set the actions

Open the **Permissions** tab and work down the list. Reads **Allowed**; writes and destructive actions **Ask first** or **Off** until you have watched the agent work.

Paperclip shows the shell warning when you change a permission on a dedicated GitHub identity. Read it as written: shell Git and `gh` use that account and are not bounded by these switches.

## 6. Put the real guardrails on GitHub

Because the shell is not gated by action permissions, the controls that matter for an agent with push access live on GitHub:

- Grant the installation **selected repositories**, not all of them.
- Protect the default branch: require a pull request, and require a review from someone other than the agent.
- Require status checks to pass before merge.

These are GitHub settings. Paperclip's [execution policy](../guides/power/execution-policy.md) can require a review stage on the Paperclip issue as well, but a Paperclip review stage and a GitHub branch protection rule are separate controls — set both if merges matter.

## 7. Verify with a read

Run one read action as the agent you intend to use, through the connector's test call. Listing the installation's repositories is enough to prove the identity resolves and the scope is what you chose.

Do not verify with a push, a pull request, or a merge.

## Chat from GitHub is a separate setup

**Chat with an agent** lets people start and continue Paperclip work from GitHub issues, pull requests, and review threads. It is a different method on the same catalog entry, it needs its own GitHub App with an **App ID** and **private key**, and it is behind the **Chat connectors** instance flag, which is off by default. It grants no repository tools.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| The managed option is missing | No Paperclip Cloud enrollment, or the `github.code` profile is not advertised. |
| Fewer repositories than expected | The installation does not include them. Fix on GitHub, then **Refresh access**. |
| *"You don't have permission to reconnect this identity."* | The identity belongs to someone else, or to another agent. |
| Tool calls work, `git push` is rejected | Account permissions or branch protection on GitHub. |

More in [Verify a connector and fix a broken one](verify-and-troubleshoot.md).

## Related

- [GitHub](github.md)
- [Connect an agent to a GitHub repo](../how-to/connect-agent-to-github.md)
- [Use separate accounts for people and agents](separate-accounts.md)
- [Set action permissions](action-permissions.md)
