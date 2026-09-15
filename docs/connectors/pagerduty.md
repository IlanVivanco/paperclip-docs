---
seo_title: PagerDuty Connector
seo_description: Connect PagerDuty's provider-hosted MCP server. Set it up in Paperclip with an API key, then choose which agents and actions are allowed.
---

# PagerDuty

Connect PagerDuty's provider-hosted MCP server.

## What this connector does

PagerDuty is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| | |
| --- | --- |
| Catalog slug | `pagerduty` |
| Category | Developer tools |
| Transport | `mcp_remote` |
| Highest risk tier | S4 — money, production data, or irreversible actions. |
| Provider research | wave 3, auth mode `api_key`, verified 2026-08-26 |

## Before you start

- A PagerDuty API token; choose the regional endpoint that hosts the account.
- A PagerDuty API token; choose the regional endpoint that hosts the account.

## Supported setup paths

Open **Connectors**, find **PagerDuty**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### US service region (`mcp-api-key-us`)

Use a restricted customer-owned key when browser sign-in is not suitable.

- Sign-in style: API key
- OAuth client: your own client or key
- Risk tier: S4
- Endpoints: MCP server `https://mcp.pagerduty.com/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **PagerDuty API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://support.pagerduty.com/main/docs/pagerduty-mcp-server) · [provider docs](https://support.pagerduty.com/main/docs/pagerduty-mcp-server)

### EU service region (`mcp-api-key-eu`)

Use a restricted customer-owned key when browser sign-in is not suitable.

- Sign-in style: API key
- OAuth client: your own client or key
- Risk tier: S4
- Endpoints: MCP server `https://mcp.eu.pagerduty.com/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **PagerDuty API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://support.pagerduty.com/main/docs/pagerduty-mcp-server) · [provider docs](https://support.pagerduty.com/main/docs/pagerduty-mcp-server)

## Accounts and access

PagerDuty follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

PagerDuty's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

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
- [PagerDuty provider documentation](https://support.pagerduty.com/main/docs/pagerduty-mcp-server)
