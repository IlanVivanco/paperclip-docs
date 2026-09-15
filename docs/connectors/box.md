---
seo_title: Box Connector
seo_description: Connect Box's provider-hosted MCP server. Set it up in Paperclip with browser sign-in, then choose which agents and actions are allowed.
---

# Box

Connect Box's provider-hosted MCP server.

## What this connector does

Box is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| Property | Value |
| --- | --- |
| Catalog slug | `box` |
| Category | Content and files |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 3, auth mode `customer_oauth`, verified 2026-08-26 |

## Before you start

- A Box administrator creates the OAuth integration and enables AI access.

## Supported setup paths

Open **Connectors**, find **Box**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Use your own OAuth app

Register an OAuth app with Box, then enter its client ID and secret.

- Sign-in style: Browser sign-in
- OAuth client: yours to register and supply
- Risk tier: S3
- Endpoints: MCP server `https://mcp.box.com`

Provider console: [register an app](https://support.box.com/hc/en-us/articles/43847256139923-Managing-Box-MCP-Servers) · [provider docs](https://support.box.com/hc/en-us/articles/43847256139923-Managing-Box-MCP-Servers)

## Accounts and access

Box follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Box's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Box
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
- [Box provider documentation](https://support.box.com/hc/en-us/articles/43847256139923-Managing-Box-MCP-Servers)
