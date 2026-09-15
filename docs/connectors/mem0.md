---
seo_title: Mem0 Connector
seo_description: Hosted long-term memory for AI applications. Agents store and recall facts across runs in your Mem0 project, under permissions you set.
---

# Mem0

Hosted long-term memory for AI applications. Agents store and recall facts across runs in your Mem0 project.

## What this connector does

Mem0 is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `mem0` |
| Category | AI tools |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 3, auth mode `api_key`, verified 2026-08-26 |

## Before you start

- A Mem0 API key; the live server currently requires the slash-normalized endpoint.

## Supported setup paths

Open **Connectors**, find **Mem0**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Use an API key

Use a restricted customer-owned key when browser sign-in is not suitable.

- Connection method: API key
- Risk tier: S3
- Endpoints: MCP server `https://mcp.mem0.ai/mcp/`

| Field | Required | What it is |
| --- | --- | --- |
| **Mem0 API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://docs.mem0.ai/platform/mem0-mcp) · [provider docs](https://docs.mem0.ai/platform/mem0-mcp)

## Accounts and access

Mem0 follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Mem0's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

There is no browser handshake. Paperclip stores the value you supply as a secret and presents it to the server on each call; the connection is created by `POST /api/companies/{companyId}/tools/apps/connect` and completed by `POST /api/companies/{companyId}/tools/apps/{connectionId}/finish`.

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
- [Mem0 provider documentation](https://docs.mem0.ai/platform/mem0-mcp)
