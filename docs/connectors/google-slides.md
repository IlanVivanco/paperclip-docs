---
seo_title: Google Slides Connector
seo_description: Let agents read Google Slides presentations and optionally update them. Capability groups, what editing covers, a read test, and troubleshooting.
---

# Google Slides

Agents can read the slides and content of a Google Slides presentation, and on an editing connection update it.

> **Warning:** Google Slides needs Google Workspace Developer Preview registration before it will authorize. Google must register the Workspace email that signs in, and the Cloud project that owns the OAuth client if you bring your own. Apply first at [Google Workspace Developer Preview](https://developers.google.com/workspace/preview).

## Before you connect

- A Google Workspace account that can already open the presentations you want agents to use, with Developer Preview registration confirmed.
- Without Paperclip Cloud enrollment, your own Google OAuth client with the Drive, Slides, and Slides MCP APIs enabled and Paperclip's callback URI registered.

## Pick a capability group

| Group | What agents can do | Scopes requested |
| --- | --- | --- |
| **Read only** | Read presentation slides and content | `drive.readonly`, `presentations.readonly` |
| **Read & edit** | The above, plus update a presentation | `drive.readonly`, `drive.file`, `presentations` |

The group is fixed for the life of the connection.

## Connect Google Slides

1. Open **Connectors** and select **Google Slides**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose the capability group, then **Connect with Paperclip** or **Use your own Google OAuth app**.
4. Complete Google's consent screen with the registered Workspace account.

## Choose access

Presentation reach comes from Google: the connection can open what the authorizing account can open. There is no file picker in Paperclip.

Reviewed operations:

| Operation | Group |
| --- | --- |
| `read-presentation` | Both |
| `update-presentation` | **Read & edit** only |

Be realistic about what editing means here. `update-presentation` applies changes through the Slides API. It is good at text content and structural slide operations. It is not the Slides editor, and it does not give an agent design judgement — themes and master layouts, precise positioning, animations and transitions, speaker-note formatting, and embedded chart refreshes are either unavailable or will not look the way a person would arrange them. Treat agent edits as a first draft that someone opens in Slides afterwards.

> **Note:** The connector's guidance is that presentation updates should be approved. Leave `update-presentation` on **Ask first**.

## Try it

```txt
Read the "Q3 review" presentation and list the title of each slide in order. Do not change it.
```

Compare the slide titles against the presentation. If you want to confirm editing, do it on a copy rather than the deck someone is about to present.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Google refuses before the consent screen | Developer Preview registration is incomplete | Finish registration and retry |
| **Connect with Paperclip** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the Slides profile | Use your own Google OAuth app |
| A presentation cannot be found | It is not shared with the authorizing account | Share it in Google Drive; no reconnect needed |
| `update-presentation` is missing | The connection was made with **Read only** | Make a connection with **Read & edit** |
| An edit landed but looks wrong | The Slides API does not cover every layout and design feature | Adjust it in Google Slides |
| **Needs attention** | The Google token expired or was revoked | Select **Reconnect** |

Limitations: one connection covers one Google account. Creating a presentation is not part of this connector — use [Google Drive](google-drive.md) with the create group. Comments and revision history are not exposed. Developer Preview applies.

## Related guides

- [Google Drive](google-drive.md) — find and create files.
- [Google Docs](google-docs.md)
- [How connector access works](access-model.md)
- [Google Slides API MCP reference](https://developers.google.com/workspace/slides/api/reference/mcp)
