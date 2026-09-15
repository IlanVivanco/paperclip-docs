---
seo_title: Postman Connector
seo_description: API development and testing workspace. Agents work with your collections and APIs, at read-only, code-generation, or full-write access.
---

# Postman

API development and testing workspace. Agents work with the collections and APIs your Postman account can reach. Pick how much access to grant: read-only, code generation, or full write.

## What this connector does

Postman is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `postman` |
| Category | Developer tools |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 2, auth mode `dcr_or_api_key`, verified 2026-08-26 |

## Before you start

- A Postman account; OAuth is available for US endpoints and API keys are required for EU endpoints.

## Supported setup paths

Open **Connectors**, find **Postman**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### US · Browser sign-in (`mcp-oauth-minimal`)

Use browser sign-in for the provider-hosted MCP server.

- Connection method: Sign in with the provider
- OAuth client: registered on demand by Paperclip
- Capability group: **Minimal**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.postman.com/minimal`

Provider console: [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

### US · Browser sign-in (`mcp-oauth-code`)

Use browser sign-in for the provider-hosted MCP server.

- Connection method: Sign in with the provider
- OAuth client: registered on demand by Paperclip
- Capability group: **Code**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.postman.com/code`

Provider console: [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

### US · Browser sign-in (`mcp-oauth-full`)

Use browser sign-in for the provider-hosted MCP server.

- Connection method: Sign in with the provider
- OAuth client: registered on demand by Paperclip
- Capability group: **Full**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.postman.com/mcp`

Provider console: [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

### EU · API key (`mcp-eu-key-minimal`)

Use a restricted customer-owned key when browser sign-in is not suitable.

- Connection method: API key
- Capability group: **Minimal**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.eu.postman.com/minimal`

| Field | Required | What it is |
| --- | --- | --- |
| **Postman API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server) · [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

### EU · API key (`mcp-eu-key-code`)

Use a restricted customer-owned key when browser sign-in is not suitable.

- Connection method: API key
- Capability group: **Code**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.eu.postman.com/code`

| Field | Required | What it is |
| --- | --- | --- |
| **Postman API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server) · [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

### EU · API key (`mcp-eu-key-full`)

Use a restricted customer-owned key when browser sign-in is not suitable.

- Connection method: API key
- Capability group: **Full**
- Risk tier: S3
- Endpoints: MCP server `https://mcp.eu.postman.com/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **Postman API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server) · [provider docs](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)

## Accounts and access

Postman follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Postman's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Postman
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
- [Postman provider documentation](https://learning.postman.com/latest-v-12/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server)
