---
seo_title: PostHog Connector
seo_description: Analyze product usage, errors, feature flags, and experiments with PostHog's hosted MCP server. Set it up in Paperclip with browser sign-in or an API key.
---

# PostHog

Analyze product usage, errors, feature flags, and experiments with PostHog's hosted MCP server.

## What this connector does

PostHog is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| Property | Value |
| --- | --- |
| Catalog slug | `posthog` |
| Category | Analytics |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |
| Provider research | wave 1, auth mode `dcr_or_api_key`, verified 2026-08-26 |

## Before you start

- A PostHog account; personal API keys and optional organization or project pinning are supported as alternatives and advanced controls.

## Supported setup paths

Open **Connectors**, find **PostHog**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Sign in with PostHog (`mcp-oauth`)

Sign in with PostHog in the browser. Recommended for hosted PostHog accounts.

- Sign-in style: Browser sign-in
- OAuth client: registered on demand, or your own OAuth app if the provider refuses dynamic registration
- Risk tier: S3
- Endpoints: MCP server `https://mcp.posthog.com/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **Pin to project ID** | No | Optional. Pin this connection to one project and remove PostHog's project-switching tool. |
| **Read-only mode** | No | Turn on to hide tools that can change PostHog data. |
| **Feature groups** | No | Leave blank to expose every feature group, or enter a comma-separated list to narrow access. |
| **Individual tools** | No | Leave blank to expose all tools. Exact names here are combined with any feature groups. |

Provider console: [provider docs](https://posthog.com/docs/model-context-protocol)

### Use a personal API key (`mcp-api-key`)

Use a PostHog personal API key when browser sign-in is not suitable.

- Sign-in style: API key
- OAuth client: yours to register and supply
- Risk tier: S3
- Endpoints: MCP server `https://mcp.posthog.com/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **PostHog personal API key** | Yes | Credential value; Paperclip stores it as a secret. |
| **Pin to project ID** | No | Optional. Pin this connection to one project and remove PostHog's project-switching tool. |
| **Read-only mode** | No | Turn on to hide tools that can change PostHog data. |
| **Feature groups** | No | Leave blank to expose every feature group, or enter a comma-separated list to narrow access. |
| **Individual tools** | No | Leave blank to expose all tools. Exact names here are combined with any feature groups. |

Provider console: [get a key](https://posthog.com/docs/model-context-protocol/faq) · [provider docs](https://posthog.com/docs/model-context-protocol/faq)

## Accounts and access

PostHog follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

PostHog's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               PostHog
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
- [PostHog provider documentation](https://posthog.com/docs/model-context-protocol)
