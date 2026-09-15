---
seo_title: Gmail Connector
seo_description: Gmail in Paperclip reads and searches mail and can create a draft. Sending, trashing, and relabelling are permanently blocked and cannot be enabled.
---

# Gmail

Search and read Gmail messages and create drafts without enabling mail sending.

The boundary is the point of this connector. An agent with Gmail can find a thread, read it, and leave a draft in your Gmail drafts folder for you to send. It cannot send, cannot trash, cannot mark spam, and cannot change labels — and no permission setting in Paperclip turns any of that on.

For the setup procedure, see [Set up the Gmail connector](gmail-setup.md). This page is the reference.

## What this connector does

| | |
| --- | --- |
| Catalog slug | `gmail` |
| Category | Communication, Productivity |
| Transport | `mcp_remote` |
| MCP server | `https://gmailmcp.googleapis.com/mcp/v1` |
| Capability groups | **Read only** (S3), **Read & create drafts** (S4) |
| Provider documentation | [Gmail API MCP reference](https://developers.google.com/workspace/gmail/api/reference/mcp) |

## The read/draft boundary

Paperclip enforces this in two independent layers. Both have to agree before a Gmail tool call runs.

**Layer one — scopes.** The connection requests only what the capability group needs:

| Capability group | OAuth scopes |
| --- | --- |
| **Read only** | `https://www.googleapis.com/auth/gmail.readonly` |
| **Read & create drafts** | `https://www.googleapis.com/auth/gmail.readonly`, `https://www.googleapis.com/auth/gmail.compose` |

There is no group that requests a send scope.

**Layer two — a permanent block list.** Independently of scopes and of your action settings, Paperclip refuses any Gmail tool whose name matches `send`, `trash`, `spam`, `delete`, `remove`, `destroy`, `execute`, or `run`, and refuses any label-related tool that is not a read. This holds even if Google adds such a tool to the server tomorrow.

Beyond the block list, a Gmail connection is limited to the reviewed tools of its capability group. An unrecognized preview tool is denied rather than allowed by default.

### Action reference

The reviewed Gmail tool set at the pinned snapshot:

| Tool | Classification | Available in |
| --- | --- | --- |
| `search_threads` | read | Read only, Read & create drafts |
| `list_threads` | read | Read only, Read & create drafts |
| `get_thread` | read | Read only, Read & create drafts |
| `search_messages` | read | Read only, Read & create drafts |
| `get_message` | read | Read only, Read & create drafts |
| `list_drafts` | read | Read only, Read & create drafts |
| `get_draft` | read | Read only, Read & create drafts |
| `list_labels` | read | Read only, Read & create drafts |
| `create_draft` | write | Read & create drafts only |

Tool names are normalized before matching, so a provider naming variant such as `google.gmail/get_message` resolves to the same entry.

> **Snapshot, not a contract.** This table is Paperclip's reviewed list as of 13 September 2026. The live list for your connection comes from Google's server. Read it on the **Permissions** tab, or with `GET /api/tool-connections/{connectionId}/catalog`; **Refresh actions** re-reads it. Newly discovered actions arrive switched off.

## Limits worth stating plainly

- **No sending.** Not through a setting, not through a capability group, not through an approved review request. If a workflow needs mail to go out, a person sends the draft from Gmail.
- **No outbound examples in this documentation.** There is no supported send path to document.
- **`create_draft` is a write.** In the draft group it is classified **write**, and the connector's guidance states that draft creation requires approval. Leave it on **Ask first** unless you have a reason not to.
- **Developer Preview.** Google's Workspace MCP servers are in Developer Preview. Both the Workspace account that signs in and the Google Cloud project that owns the OAuth client must be registered by Google before a connection will authorize.
- **Read-only groups stay read-only.** A connection made with **Read only** does not gain `create_draft` by flipping a switch. Reconnect with the draft group instead.

## Setup paths

Four, in two pairs. The pairs differ only in whose OAuth client is used; the capability group is the real choice.

| Method | Client | Capability | Risk |
| --- | --- | --- | --- |
| `paperclip-read` — **Connect with Paperclip** | Paperclip's managed Google client | Read only | S3 |
| `customer-read-oauth` — **Use your own Google OAuth app** | Yours | Read only | S3 |
| `paperclip-draft` — **Connect with Paperclip** | Paperclip's managed Google client | Read & create drafts | S4 |
| `customer-draft-oauth` — **Use your own Google OAuth app** | Yours | Read & create drafts | S4 |

**Connect with Paperclip** appears only when your instance is enrolled with Paperclip Cloud and Cloud advertises the Gmail connector profile. Without enrollment, the customer-owned paths are the supported route.

When no capability group is specified, Paperclip recommends the **Read & create drafts** managed method. Choose **Read only** explicitly if you do not want draft creation on this connection.

## Authorization sequence

```txt
You             Paperclip               Google
|               |                       |
+--------------->                       |  Connect: POST /api/companies/{companyId}/tools/apps/connect
|               |                       |
|               +----------------------->  authorization request to https://accounts.google.com/o/oauth2/v2/auth
|               |                       |
+--------------------------------------->  consent for gmail.readonly (+ gmail.compose for drafts)
|               |                       |
|               <-----------------------+  redirect with code
|               |                       |
|               +----------------------->  code to token at https://oauth2.googleapis.com/token
|               |                       |
+--------------->                       |  choose access and actions: POST .../tools/apps/{connectionId}/finish
|               |                       |
```

Paperclip-managed connections return through `GET /api/tools/oauth/cloud-connector/callback`; customer-owned clients return through `GET /api/tools/oauth/callback`.

Endpoints used:

| Purpose | Endpoint |
| --- | --- |
| MCP server | `https://gmailmcp.googleapis.com/mcp/v1` |
| Authorization | `https://accounts.google.com/o/oauth2/v2/auth` |
| Token | `https://oauth2.googleapis.com/token` |
| Provider metadata | `https://accounts.google.com/.well-known/openid-configuration` |

## Accounts and access

Gmail is a mailbox, so **Just me** is usually the right identity: the credential is yours, and agents use it only on runs where you are the responsible person.

An **Organization identity** on Gmail means one mailbox that every eligible agent reads on any run, whoever started it. That is occasionally what you want — a shared support inbox — and it needs the connection-manager permission. [Use separate accounts for people and agents](separate-accounts.md) has the comparison.

## Verify it safely

Run one read. `search_threads` against a query you can confirm by eye is the cheapest honest check. Do not verify Gmail by creating a draft: a draft is a write, and it leaves something behind in a real mailbox.

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) has the full procedure.

## Troubleshooting

| What you see | What it means |
| --- | --- |
| Authorization refused before the consent screen | Developer Preview registration is not complete for the signing-in account or the Cloud project. |
| **Connect with Paperclip** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the Gmail profile. Use your own Google OAuth app. |
| `create_draft` is absent from the action list | The connection was made with the **Read only** group. |
| A send-like tool is absent or refused | Expected. It is permanently blocked. |
| **Needs attention** with a reconnect prompt | The Google token expired or was revoked. Select **Reconnect**. |

## Related

- [Set up the Gmail connector](gmail-setup.md)
- [Google Workspace Search](google-workspace-search.md) — one read-only search across Gmail, Drive, Calendar, and Chat.
- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
