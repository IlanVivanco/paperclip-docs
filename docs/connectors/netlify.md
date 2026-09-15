---
seo_title: Netlify Connector
seo_description: Connect Netlify's provider-hosted MCP server. Set it up in Paperclip with browser sign-in, then choose which agents and actions are allowed.
---

# Netlify

Connect Netlify's provider-hosted MCP server.

## What this connector does

Netlify is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| | |
| --- | --- |
| Catalog slug | `netlify` |
| Category | Developer tools |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 1, auth mode `dcr`, verified 2026-08-26 |

## Before you start

- A Netlify account with access to the relevant team and sites.
- A Netlify account with access to the relevant team and sites.

## Supported setup paths

Open **Connectors**, find **Netlify**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Sign in with Netlify

Use browser sign-in for the provider-hosted MCP server.

- Sign-in style: Browser sign-in
- OAuth client: registered on demand
- Risk tier: S3
- Endpoints: MCP server `https://netlify-mcp.netlify.app/mcp`

Provider console: [provider docs](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/agent-setup-overview/)

## Accounts and access

Netlify follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Netlify's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You                 Paperclip                      Netlify
 │  Connect            │                                │
 ├────────────────────▶│ POST /api/companies/{id}/      │
 │                     │      tools/apps/connect        │
 │                     ├───────────────────────────────▶│  authorization request
 │  sign in + consent  │                                │
 ├─────────────────────┼───────────────────────────────▶│
 │                     │◀───────────────────────────────┤  redirect with code
 │                     │ GET /api/tools/oauth/callback  │
 │                     ├───────────────────────────────▶│  code → token
 │  choose access      │                                │
 ├────────────────────▶│ POST …/tools/apps/{id}/finish  │
 │                     │                                │
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
- [Netlify provider documentation](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/agent-setup-overview/)
