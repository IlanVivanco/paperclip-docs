---
seo_title: Notion Connector
seo_description: Connect Notion so agents can search, read, and update the pages and databases you share with the connection. Setup, access scope, a read-only test, and troubleshooting.
---

# Notion

Notion's hosted connection lets agents search your workspace, read pages and databases, and — when you allow it — create and update them.

What an agent can reach is decided on Notion's side, at the consent screen, by the pages and databases you share with the connection. Paperclip does not narrow that set further, so share deliberately.

## Before you connect

- A Notion account that can already open the pages and databases you want agents to use.
- Permission to add a connection to the workspace. Some Notion plans let a workspace owner restrict which integrations members may approve; if yours does, ask an owner to approve Notion's Paperclip connection first.
- Decide which pages or databases to share before you start. The consent screen is where you choose them, and it is quicker than revisiting afterwards.

## Connect Notion

1. Open **Connectors** and select **Notion**.
2. On the **Access** step, choose the identity that owns the credential and which agents may use the connection. Select **Continue to Notion**.
3. Sign in to Notion and pick the workspace you want to connect.
4. On Notion's access screen, select the specific pages and databases to share. Notion's page picker includes child pages of anything you select.
5. Notion returns you to Paperclip and the connection becomes **Ready**.

Paperclip registers its client with Notion automatically, so there is nothing to set up in a developer console.

> **Note:** If your instance routes credentials through Vercel Connect, Notion can also be connected that way; the access and sharing decisions are the same.

### Optional: use your own Notion OAuth app

Notion accepts Paperclip's automatic client registration, so this is not needed for an ordinary setup. Use it only when the connection must appear under a Notion integration your organization owns — for example to satisfy an internal review of installed integrations.

You supply the client ID and secret from your own Notion integration during setup. Sharing and consent work the same way afterwards.

## Choose access

Three separate decisions govern a Notion call. [How connector access works](access-model.md) explains all three in one place; the Notion-specific parts are:

| Decision | What it means for Notion |
| --- | --- |
| Identity | **Just me** uses your Notion account on your own runs. An **Organization identity** shares one Notion account across eligible agents on any run, and needs the connection-manager permission. |
| Reachable content | Whatever you shared at Notion's consent screen. To widen or narrow it, change the sharing in Notion — reconnecting is not required for content changes. |
| Actions | Notion's server supplies the action list. Reads and writes are classified separately, so you can leave reads **Allowed** and put writes on **Ask first**. |

Representative operations at the current reviewed catalog: search, fetch a page, query a database, and read comments on the read side; create and update pages, create comments, create databases, and move or duplicate pages on the write side. Open the connection's **Permissions** tab for the live list, and **Refresh actions** to re-read it.

> **Note:** Moving, duplicating, and converting pages are writes even though their names do not start with a create or update verb. Paperclip classifies them explicitly so they are not mistaken for reads.

## Try it

Give an agent that holds the connection a read-only task. Substitute a page you know is shared:

```txt
Find the "Engineering onboarding" page in Notion and summarize it. Do not make any changes.
```

Expect the agent to search, open the page, and return a summary. Confirm it on the task's activity, where the Notion calls appear with the action used and the connection they ran against.

A read is the right first check because it leaves nothing behind. If you want to confirm writes as well, do it on a scratch page you created for the purpose.

> **Note:** This is an illustrative task, not a recorded test result. Adjust the page name to something in your own workspace.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Search returns nothing, or a page you expected is missing | The page was never shared with the connection, or it lives in a different workspace | Open the connection in Notion's **Connections** settings and add the page. Child pages follow their parent |
| Authorization does not complete | A workspace owner restricts which integrations members may approve | Ask an owner to approve the connection, then retry |
| A write action is missing from the list | The action list is the provider's, and Notion changes it | Use **Refresh actions**. Newly discovered actions arrive switched off |
| Calls stop working after a while | The Notion grant was revoked, in Notion or in Paperclip | The connection shows **Needs attention**; select **Reconnect** |

Limitations worth knowing: this connector is Notion's hosted content connection, not the whole Notion API. Workspace administration, user management, and billing are not exposed. A connection reaches one workspace; connect Notion again for a second workspace.

## Related guides

- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Verify a connector and fix a broken one](verify-and-troubleshoot.md)
- [Notion's MCP overview](https://developers.notion.com/guides/mcp/overview) — the provider's description of the hosted connection and what it can reach.
