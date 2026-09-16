---
seo_title: Google Docs Connector
seo_description: Let agents read Google Docs documents and optionally update them. Capability groups, document scope, what editing covers, a read test, and troubleshooting.
---

# Google Docs

Agents can read the text and structure of Google Docs documents, and on an editing connection update them.

> **Warning:** Google Docs needs Google Workspace Developer Preview registration before it will authorize. Google must register the Workspace email that signs in, and the Cloud project that owns the OAuth client if you bring your own. Apply first at [Google Workspace Developer Preview](https://developers.google.com/workspace/preview).

## Before you connect

- A Google Workspace account that can already open the documents you want agents to use.
- Developer Preview registration for that account, confirmed by Google.
- Without Paperclip Cloud enrollment, you need your own Google OAuth client with the Drive, Docs, and Docs MCP APIs enabled and Paperclip's callback URI registered.

## Pick a capability group

| Group | What agents can do | Scopes requested |
| --- | --- | --- |
| **Read only** | Read document text and structure | `drive.readonly`, `documents.readonly` |
| **Read & edit** | The above, plus update a document | `drive.readonly`, `drive.file`, `documents` |

The group is fixed for the life of the connection.

## Connect Google Docs

1. Open **Connectors** and select **Google Docs**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose the capability group, then **Connect with Paperclip** or **Use your own Google OAuth app**.
4. Complete Google's consent screen with the registered Workspace account.

## Choose access

Document reach comes from Google: the connection can open what the authorizing account can open. There is no document picker in Paperclip.

Reviewed operations:

| Operation | Group |
| --- | --- |
| `read-doc` | Both |
| `update-doc` | **Read & edit** only |

This is a deliberately small surface, and it is worth being clear about what it is not. `update-doc` applies document updates through the Docs API; it is not the full Google Docs editor. Do not promise an agent will reproduce native editing behaviour — complex formatting, suggestions and comment threads, revision history operations, and collaborative features are not exposed here.

> **Note:** The connector's guidance is that document updates should be approved. Leave `update-doc` on **Ask first**; an edit lands in a real document that other people may be working in.

[How connector access works](access-model.md) covers identity and agent selection.

## Try it

```txt
Read the Google Doc titled "Team charter" and summarize its main sections. Do not edit it.
```

Expect a summary whose headings match what you see in the document. If you want to confirm editing, do it on a scratch document you created for the purpose, not a live one.

> **Note:** Illustrative task, not a recorded test result. Substitute a document title from your own account.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Google refuses before the consent screen | Developer Preview registration is incomplete | Finish registration and retry |
| **Connect with Paperclip** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the Docs profile | Use your own Google OAuth app |
| A document cannot be found | It is not shared with the authorizing account | Share it in Google Drive; no reconnect needed |
| `update-doc` is missing | The connection was made with **Read only** | Make a connection with **Read & edit** |
| An edit did not produce the formatting you expected | The update goes through the Docs API, which does not cover every editor feature | Finish the formatting in Google Docs |
| **Needs attention** | The Google token expired or was revoked | Select **Reconnect** |

Limitations: one connection covers one Google account. Creating a document is not part of this connector — use [Google Drive](google-drive.md) with the create group. Comments, suggestions, and revision history are not exposed. Developer Preview applies.

## Related guides

- [Google Drive](google-drive.md) — find and create files.
- [How connector access works](access-model.md)
- [Verify a connector and fix a broken one](verify-and-troubleshoot.md)
- [Google Docs API MCP reference](https://developers.google.com/workspace/docs/api/reference/mcp)
