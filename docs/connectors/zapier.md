---
seo_title: Zapier Connector
seo_description: Reach thousands of apps through your Zapier account. Set it up in Paperclip with no sign-in, then choose which agents and actions are allowed.
---

# Zapier

Reach thousands of apps through your Zapier account.

## What this connector does

Zapier is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| Property | Value |
| --- | --- |
| Catalog slug | `zapier` |
| Category | Productivity |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 3, auth mode `generated_url`, verified 2026-08-26 |

## Before you start

- Create a Zapier MCP server, choose the actions it exposes, and paste its generated connection URL.

## Supported setup paths

Open **Connectors**, find **Zapier**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Paste generated MCP URL

Use the complete provider-generated MCP URL from Zapier.

- Sign-in style: No sign-in
- OAuth client: yours to register and supply
- Risk tier: S3

## Accounts and access

Zapier follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Zapier's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

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
- [Zapier provider documentation](https://docs.zapier.com/mcp/quickstart)
