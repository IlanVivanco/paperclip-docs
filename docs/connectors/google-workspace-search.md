---
seo_title: Google Workspace Search Connector
seo_description: One read-only search across Gmail, Drive, Calendar, and Chat. When to use it instead of the single-app connectors, what it requests, and a test.
---

# Google Workspace Search

One read-only search that spans Gmail, Drive, Calendar, and Chat together, so an agent can answer "where did we discuss this?" without knowing which app holds the answer.

It searches all four. There is no way to connect it for a subset.

> **Warning:** This connection requests read access to Gmail, Drive, Calendar, and Chat at once. That is broader than any single-app connector. If an agent only needs one app, connect that app instead.

## When to use this instead of an app connector

| You want | Use |
| --- | --- |
| To find something without knowing which app it is in | This connector |
| To read, edit, or create in one specific app | [Gmail](gmail.md), [Google Drive](google-drive.md), [Google Calendar](google-calendar.md), or [Google Chat](google-chat.md) |
| The narrowest possible access | The single-app connector, with its read-only group |

This connector only searches. It returns results with links; it does not read a full document, create a draft, or change an event. Agents that need to act on what they find also need the relevant app connector.

## Before you connect

- A Google Workspace account whose mail, files, calendar, and chat you are willing to make searchable.
- Google Workspace Developer Preview registration for that account, confirmed by Google. Apply at [Google Workspace Developer Preview](https://developers.google.com/workspace/preview).
- Without Paperclip Cloud enrollment, your own Google OAuth client with the **Gmail API**, **Drive API**, **Calendar API**, **Chat API**, and **Workspace MCP API** enabled — five APIs, more than any single-app connector needs. [Set up your own Google OAuth app](google-setup.md) is the complete procedure.

## Connect Google Workspace Search

1. Open **Connectors** and select **Google Workspace Search**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Select **Connect with Paperclip**, or **Use your own Google OAuth app** — the latter needs the client ID and secret from [Set up your own Google OAuth app](google-setup.md).
4. Complete Google's consent screen with the registered Workspace account.

One capability group, **Search Workspace**, requesting `gmail.readonly`, `drive.readonly`, `calendar.readonly`, and `chat.messages.readonly`. There is a single operation, `search-corpus`.

## Choose access

What the search covers is what the authorizing account can already see across those four apps — its own mail, files shared with it, calendars on its list, and spaces it belongs to. Paperclip does not narrow it, and there is no per-app or per-folder filter.

Because the scope is wide, the agent-selection choice matters more than usual. Prefer **Just agents I pick**. An **Organization identity** here means eligible agents can search one person's mail and files on any run — rarely what you want.

[How connector access works](access-model.md) covers identity and agent selection.

## Try it

Search for something you know exists and can recognize in the results:

```txt
Search my Google Workspace for "renewal contract" and tell me which app each result came from.
```

Expect a handful of results, each identifying its source app with a link. Asking where each result came from is the useful check — it confirms the search really spans the corpora rather than returning one app's hits.

> **Note:** Illustrative task, not a recorded test result. Use a phrase you know appears in your own mail or files.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Google refuses before the consent screen | Developer Preview registration is incomplete | Finish registration and retry |
| **Connect with Paperclip** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the search profile | Use your own Google OAuth app |
| Results only ever come from one app | The query matches in one corpus, or the account has little content in the others | Try a phrase you know appears elsewhere |
| A result is found but the agent cannot read the whole item | Expected — this connector searches, it does not read | Add the relevant app connector |
| You want to search only Drive | Not supported; the group covers all four | Use the [Google Drive](google-drive.md) connector |
| **Needs attention** | The Google token expired or was revoked | Select **Reconnect** |

Limitations: read-only, search-only, one account, all four corpora or none. Developer Preview applies.

## Related guides

- [Gmail](gmail.md), [Google Drive](google-drive.md), [Google Calendar](google-calendar.md), [Google Chat](google-chat.md)
- [How connector access works](access-model.md)
- [Google universal search MCP guide](https://developers.google.com/workspace/guides/universal-search-mcp)
