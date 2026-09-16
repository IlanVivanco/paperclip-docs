---
seo_title: Asana Connector
seo_description: Let agents read and update Asana tasks. Registering the required OAuth app, workspace and project reach, a read test, and troubleshooting.
---

# Asana

Agents can work with Asana tasks — finding them, reading details, and updating or creating them.

## Before you connect

- An Asana account with access to the workspace and projects you want agents to use.
- You must register your own Asana OAuth app. Asana does not support automatic client registration for this server, so there is no path that skips the developer console. Add Paperclip's callback URI to the app; Paperclip shows the exact URI during setup.
- Some Asana organizations restrict who may create or authorize apps. If you are not an administrator, check before you start rather than after.

## Connect Asana

1. Create an Asana MCP OAuth app in Asana's developer console and register Paperclip's callback URI on it. Keep the client ID and secret to hand.
2. Open **Connectors** and select **Asana**.
3. On the **Access** step, choose the identity and which agents may use the connection.
4. Select **Use your own OAuth app**, supply the client ID and secret, then authorize in Asana.

## Choose access

Reach is the authorizing Asana account's: the workspaces it belongs to and the projects it can open. Private projects the account is not a member of stay invisible, which is often the simplest way to keep something out of reach.

There is no workspace or project picker in Paperclip. To narrow access, authorize with an account that is a member of fewer projects.

Task creation, updates, and comments are writes that your team will see. Leave them on **Ask first** until the workflow is proven. Reads can stay **Allowed**. See [Set action permissions](action-permissions.md).

Attribution follows the authorizing account, so a dedicated account makes agent activity distinguishable. See [Use separate accounts for people and agents](separate-accounts.md).

## Try it

```txt
Find the Asana task called "Update onboarding checklist" and tell me its assignee, due date, and current status. Do not change it.
```

Compare against the task in Asana. A lookup of a task you can already see confirms the credential and the agent's permission without touching your team's board.

> **Note:** Illustrative task, not a recorded test result. Substitute a task name from your own workspace.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Setup asks for a client ID and secret | Expected — Asana requires your own OAuth app | Register one in Asana's developer console |
| Authorization fails with a redirect or URI error | The callback URI on the Asana app does not match the one Paperclip shows | Copy the URI exactly and retry |
| You cannot create the app | The Asana organization restricts app creation | Ask an Asana administrator |
| A project's tasks are invisible | The authorizing account is not a member of that project | Add it to the project in Asana; no reconnect needed |
| An update is rejected | Asana's own field rules or permissions on that project | Check the task and project settings in Asana |
| **Needs attention** | The grant was revoked in Asana | Select **Reconnect** |

Limitations: one Asana account per connection. No workspace or project restriction inside Paperclip. Asana's rate limits apply.

## Related guides

- [Jira](jira.md), [Linear](linear.md), [Todoist](todoist.md) — other work tracking connectors.
- [Use separate accounts for people and agents](separate-accounts.md)
- [Set action permissions](action-permissions.md)
- [Asana MCP server documentation](https://developers.asana.com/docs/integrating-with-asanas-mcp-server)
