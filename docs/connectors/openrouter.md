---
seo_title: OpenRouter Connector
seo_description: Supplies one credential that routes to models from many vendors. It is not an agent tool, so it adds no actions to any permission list.
---

# OpenRouter

Run models from many vendors through one credential and one bill.

## What this connector does

OpenRouter is a **model provider**, not an agent tool. It supplies the credential an agent's runtime uses when it runs a model. It does not add any actions to the **Permissions** tab, and it never appears in a review request.

| Property | Value |
| --- | --- |
| Catalog slug | `openrouter` |
| Category | Model providers |
| Transport | `runtime_auth` |
| Highest risk tier | S3 — account data that can be changed. |

## Before you start

- An account with the provider, and permission in Paperclip to create a connection. Sharing one with the whole company or with a dedicated agent identity additionally needs the connection-manager permission.

## Supported setup paths

Open **Connectors**, find **OpenRouter**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### OpenRouter API key

Authenticate an agent with this account.

- Connection method: API key
- Risk tier: S3

| Field | Required | What it is |
| --- | --- | --- |
| **API key** | Yes | Credential value; Paperclip stores it as a secret. |

## Accounts and access

A model provider connection is attached to a grant like any other connection, but it is consumed by the agent runtime rather than by the tool gateway. Choose **Just me** to keep the credential to your own runs, or **Any human in the company** to let every eligible agent use it. See [Use separate accounts for people and agents](separate-accounts.md).

## Actions

None. A model provider connection exposes no callable actions.

## Check that it works

The connector list shows **Healthy** once the credential validates. Assign the account to an agent and start a short run; a failing credential surfaces as **Needs attention** with **The key stopped working — reconnect to fix.**

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
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
