---
seo_title: Asana Connector
seo_description: Work management for team projects, tasks, and goals. Agents work with the projects and tasks your own Asana OAuth app is allowed to reach.
---

# Asana

Work management for team projects, tasks, and goals. Agents work with the projects and tasks your Asana app can reach.

## What this connector does

Asana is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `asana` |
| Category | Productivity and collaboration |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 3, auth mode `customer_oauth`, verified 2026-08-26 |

## Before you start

- Create an Asana MCP OAuth app and register Paperclip's callback URI; DCR is not supported.

## Supported setup paths

Open **Connectors**, find **Asana**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Use your own OAuth app

Register an OAuth app with Asana, then enter its client ID and secret.

- Connection method: Your own OAuth app
- OAuth client: yours to register and supply
- Risk tier: S3
- Endpoints: MCP server `https://mcp.asana.com/v2/mcp`

Provider console: [register an app](https://developers.asana.com/docs/integrating-with-asanas-mcp-server) · [provider docs](https://developers.asana.com/docs/integrating-with-asanas-mcp-server)

## Accounts and access

Asana follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Asana's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Asana
|               |                       |
+--------------->                       |  Connect: POST /api/companies/{companyId}/tools/apps/connect
|               |                       |
|               +----------------------->  authorization request
|               |                       |
+--------------------------------------->  sign in and consent
|               |                       |
|               <-----------------------+  redirect with code
|               |                       |
|               +----------------------->  GET /api/tools/oauth/callback, code to token
|               |                       |
+--------------->                       |  choose access and actions: POST .../tools/apps/{connectionId}/finish
|               |                       |
```

## Check that it works

Use a read-only action first. [Verify a connector and fix a broken one](verify-and-troubleshoot.md) has the full procedure, including the built-in test call and what each status word in the connector list means.

## If something goes wrong

| What you see | What it means |
| --- | --- |
| **Setup incomplete** | The connection record exists but setup never finished. Select **Finish setup**. |
| **Needs attention** | The credential stopped working. Select **Reconnect** and sign in again. |
| **Paused** | Agents cannot use the connection right now. |

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) covers the rest.

## Related

- [Connectors](../connectors.md)
- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
- [Asana provider documentation](https://developers.asana.com/docs/integrating-with-asanas-mcp-server)
