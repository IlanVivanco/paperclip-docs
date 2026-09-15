---
seo_title: Google Chat Connector
seo_description: Google Workspace's team messaging. Agents search and read conversations, and on a write connection post messages. It is an agent tool, not a chat channel.
---

# Google Chat

Google Workspace's team messaging. Agents search and read conversations, and on a write connection post messages. This is an agent tool, not a way for people to talk to an agent.

## What this connector does

Google Chat is an **app integration**: it gives agents actions to call. Once it is connected, the provider's server supplies the action list, and Paperclip governs which agents may call which of those actions.

| Property | Value |
| --- | --- |
| Catalog slug | `google-chat` |
| Category | Communication, Productivity and collaboration |
| Transport | `mcp_remote` |
| Highest risk tier | S4 — money, production data, or irreversible actions. |

## Before you start

- **Google Developer Preview access required.** Google must register both the Workspace email used to authorize Paperclip and the Google Cloud project that owns the OAuth client. Registration is limited to those emails and projects; it does not enable unrelated Paperclip customers. See [Apply or verify Developer Preview enrollment](https://developers.google.com/workspace/preview).
- Google Workspace MCP servers are in Developer Preview.
- A Google Chat app must be configured in the Cloud project.
- Sending messages requires approval.
- The **Connect with Paperclip** option only appears when this Paperclip instance is enrolled with Paperclip Cloud and Cloud advertises the matching connector profile. Without enrollment, use the customer-owned option instead.

## Supported setup paths

Open **Connectors**, find **Google Chat**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Connect with Paperclip (`paperclip-read`)

Use Paperclip-managed OAuth for read-only Chat access.

- Connection method: Connect with Paperclip
- OAuth client: Paperclip's managed client
- Capability group: **Read only**
- Risk tier: S3
- Endpoints: MCP server `https://chatmcp.googleapis.com/mcp/v1`
- Requested scopes:
  - `https://www.googleapis.com/auth/chat.spaces.readonly`
  - `https://www.googleapis.com/auth/chat.memberships.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`
  - `https://www.googleapis.com/auth/chat.users.readstate.readonly`

### Use your own Google OAuth app (`customer-read-oauth`)

Use a customer-owned OAuth client for read-only Chat access.

- Connection method: Your own OAuth app
- OAuth client: yours to register and supply
- Capability group: **Read only**
- Risk tier: S3
- Endpoints: MCP server `https://chatmcp.googleapis.com/mcp/v1`; authorization `https://accounts.google.com/o/oauth2/v2/auth`; token `https://oauth2.googleapis.com/token`; metadata `https://accounts.google.com/.well-known/openid-configuration`
- Requested scopes:
  - `https://www.googleapis.com/auth/chat.spaces.readonly`
  - `https://www.googleapis.com/auth/chat.memberships.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`
  - `https://www.googleapis.com/auth/chat.users.readstate.readonly`

Provider console: [register an app](https://console.cloud.google.com/auth/clients) · [provider docs](https://developers.google.com/workspace/guides/configure-mcp-servers)

### Connect with Paperclip (`paperclip-write`)

Use Paperclip-managed OAuth to read Chat and send messages.

- Connection method: Connect with Paperclip
- OAuth client: Paperclip's managed client
- Capability group: **Read & send**
- Risk tier: S4
- Endpoints: MCP server `https://chatmcp.googleapis.com/mcp/v1`
- Requested scopes:
  - `https://www.googleapis.com/auth/chat.spaces.readonly`
  - `https://www.googleapis.com/auth/chat.memberships.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`
  - `https://www.googleapis.com/auth/chat.users.readstate.readonly`
  - `https://www.googleapis.com/auth/chat.messages.create`

### Use your own Google OAuth app (`customer-write-oauth`)

Use a customer-owned OAuth client to read Chat and send messages.

- Connection method: Your own OAuth app
- OAuth client: yours to register and supply
- Capability group: **Read & send**
- Risk tier: S4
- Endpoints: MCP server `https://chatmcp.googleapis.com/mcp/v1`; authorization `https://accounts.google.com/o/oauth2/v2/auth`; token `https://oauth2.googleapis.com/token`; metadata `https://accounts.google.com/.well-known/openid-configuration`
- Requested scopes:
  - `https://www.googleapis.com/auth/chat.spaces.readonly`
  - `https://www.googleapis.com/auth/chat.memberships.readonly`
  - `https://www.googleapis.com/auth/chat.messages.readonly`
  - `https://www.googleapis.com/auth/chat.users.readstate.readonly`
  - `https://www.googleapis.com/auth/chat.messages.create`

Provider console: [register an app](https://console.cloud.google.com/auth/clients) · [provider docs](https://developers.google.com/workspace/guides/configure-mcp-servers)

## Accounts and access

Google Chat follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Google Chat's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

```txt
You             Paperclip               Google Chat
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
- [Google Chat provider documentation](https://developers.google.com/workspace/chat/api/reference/mcp)
