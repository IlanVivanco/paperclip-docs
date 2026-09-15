---
seo_title: Sentry Connector
seo_description: Error and performance monitoring. Agents investigate errors, releases, and production issues in the organizations, projects, and environments you pick.
---

# Sentry

Error and performance monitoring. Agents investigate errors, releases, and production issues in the organizations, projects, and environments you pick.

## What this connector does

Sentry is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `sentry` |
| Category | Developer tools |
| Transport | `mcp_remote` |
| Highest risk tier | S2 — account data with limited blast radius. |
| Provider research | wave 1, auth mode `dcr_cimd`, verified 2026-08-26 |

## Before you start

- A Sentry account with access to the relevant organizations and projects.

## Supported setup paths

Open **Connectors**, find **Sentry**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Sign in with Sentry

Use the provider-hosted connection for the quickest setup.

- Connection method: Sign in with the provider, or your own OAuth app
- OAuth client: registered on demand, or your own OAuth app if the provider refuses dynamic registration
- Risk tier: S2
- Endpoints: MCP server `https://mcp.sentry.dev/mcp`

## Accounts and access

Sentry follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Sentry's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Sentry
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
| Authorization loops or is refused | The provider may require an administrator to approve the client on first use. |

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) covers the rest.

## Related

- [Connectors](../connectors.md)
- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
- [Sentry provider documentation](https://mcp.sentry.dev/.well-known/oauth-authorization-server)
