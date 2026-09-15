---
seo_title: AgentMail Connector
seo_description: Email inboxes built for software agents. Gives an agent its own inbox and turns each email conversation into a Paperclip task you can follow.
---

# AgentMail

Email inboxes built for software agents. Gives an agent its own inbox and turns each email conversation into a Paperclip task.

## What this connector does

AgentMail is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `agentmail` |
| Category | Communication |
| Transport | `rest_api` |
| Highest risk tier | S3 — account data that can be changed. |

## Before you start

- An account with the provider, and permission in Paperclip to create a connection. Sharing one with the whole company or with a dedicated agent identity additionally needs the connection-manager permission.

## Supported setup paths

Open **Connectors**, find **AgentMail**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Email with an agent

Assign an inbox to an agent and manage email conversations in tasks.

- Connection method: API key
- Risk tier: S3

| Field | Required | What it is |
| --- | --- | --- |
| **AgentMail API key** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [get a key](https://console.agentmail.to) · [provider docs](https://docs.agentmail.to/inboxes)

## Accounts and access

AgentMail follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

AgentMail's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

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
