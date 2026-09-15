---
seo_title: Google Workspace Search Connector
seo_description: One read-only search across Gmail, Drive, Calendar, and Chat in a Google account, for when an agent needs to find something without knowing where it is.
---

# Google Workspace Search

One read-only search that spans Gmail, Drive, Calendar, and Chat in a single Google account. Use it when an agent needs to find something without knowing which app holds it.

## What this connector does

Google Workspace Search is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `google-workspace-search` |
| Category | Data and analytics, Productivity and collaboration |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |

## Before you start

- **Google Developer Preview access required.** Google must register both the Workspace email used to authorize Paperclip and the Google Cloud project that owns the OAuth client. Registration is limited to those emails and projects; it does not enable unrelated Paperclip customers. See [Apply or verify Developer Preview enrollment](https://developers.google.com/workspace/preview).
- This requests read access to all four supported search corpora.
- Google Workspace MCP servers are in Developer Preview.
- The **Connect with Paperclip** option only appears when this Paperclip instance is enrolled with Paperclip Cloud and Cloud advertises the matching connector profile. Without enrollment, use the customer-owned option instead.

## Supported setup paths

Open **Connectors**, find **Google Workspace Search**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Connect with Paperclip (`paperclip-read`)

Use Paperclip-managed OAuth for cross-product Workspace search.

- Connection method: Connect with Paperclip
- OAuth client: Paperclip's managed client
- Capability group: **Search Workspace**
- Risk tier: S3
- Endpoints: MCP server `https://workspacemcp.googleapis.com/mcp/v1`
- Requested scopes:
  - `https://www.googleapis.com/auth/gmail.readonly`
  - `https://www.googleapis.com/auth/drive.readonly`
  - `https://www.googleapis.com/auth/calendar.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`

### Use your own Google OAuth app (`customer-read-oauth`)

Use a customer-owned OAuth client for cross-product Workspace search.

- Connection method: Your own OAuth app
- OAuth client: yours to register and supply
- Capability group: **Search Workspace**
- Risk tier: S3
- Endpoints: MCP server `https://workspacemcp.googleapis.com/mcp/v1`; authorization `https://accounts.google.com/o/oauth2/v2/auth`; token `https://oauth2.googleapis.com/token`; metadata `https://accounts.google.com/.well-known/openid-configuration`
- Requested scopes:
  - `https://www.googleapis.com/auth/gmail.readonly`
  - `https://www.googleapis.com/auth/drive.readonly`
  - `https://www.googleapis.com/auth/calendar.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`

Provider console: [register an app](https://console.cloud.google.com/auth/clients) · [provider docs](https://developers.google.com/workspace/guides/universal-search-mcp)

## Accounts and access

Google Workspace Search follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Google Workspace Search's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Google Workspace Se~
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

The Paperclip-managed path returns through `GET /api/tools/oauth/cloud-connector/callback` instead of the generic callback.

## Check that it works

Use a read-only action first. [Verify a connector and fix a broken one](verify-and-troubleshoot.md) has the full procedure, including the built-in test call and what each status word in the connector list means.

## If something goes wrong

| What you see | What it means |
| --- | --- |
| **Setup incomplete** | The connection record exists but setup never finished. Select **Finish setup**. |
| **Needs attention** | The credential stopped working. Select **Reconnect** and sign in again. |
| **Paused** | Agents cannot use the connection right now. |
| The provider rejects the sign-in | Confirm the prerequisite above is done: google developer preview access required. |

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) covers the rest.

## Related

- [Connectors](../connectors.md)
- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
- [Google Workspace Search provider documentation](https://developers.google.com/workspace/guides/universal-search-mcp)
