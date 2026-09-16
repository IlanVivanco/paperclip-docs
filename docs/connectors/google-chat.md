---
seo_title: Google Chat Connector
seo_description: Let agents search and read Google Chat conversations, and optionally send messages. This is a tool connector, not a way for people to chat with an agent.
---

# Google Chat

Agents can search Google Chat conversations and read messages, and on a sending connection post messages to spaces the authorizing account belongs to.

This is a tool connector: an agent reads and writes Chat using *your* Google account. It is not a channel for people to start work by messaging an agent — Google Chat is not one of Paperclip's conversation channels. If that is what you want, see [Slack](slack.md), [Discord](discord.md), [Microsoft Teams](microsoft-teams.md), or [Telegram](telegram.md).

> **Warning:** Google Chat needs Google Workspace Developer Preview registration before it will authorize. Google must register the Workspace email that signs in, and the Cloud project that owns the OAuth client if you bring your own. Apply first at [Google Workspace Developer Preview](https://developers.google.com/workspace/preview).

## Before you connect

- A Google Workspace account that already belongs to the spaces you want agents to read, with Developer Preview registration confirmed.
- If you bring your own Google OAuth client, you must also **configure a Google Chat app in the Cloud project** — Chat is the one Google connector with this extra requirement. Enable the Chat and Chat MCP APIs and register Paperclip's callback URI.
- Personal Google accounts do not have Google Chat spaces in the Workspace sense; this connector expects a Workspace account.

## Pick a capability group

| Group | What agents can do | Scopes requested |
| --- | --- | --- |
| **Read only** | Search conversations, list and search messages | `chat.spaces.readonly`, `chat.memberships.readonly`, `chat.messages.readonly`, `chat.users.readstate.readonly` |
| **Read & send** | The above, plus send a message | the read scopes, plus `chat.messages.create` |

The group is fixed for the life of the connection.

## Connect Google Chat

1. Open **Connectors** and select **Google Chat**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose the capability group, then **Connect with Paperclip** or **Use your own Google OAuth app**.
4. Complete Google's consent screen with the registered Workspace account.

## Choose access

Which conversations an agent can reach is decided by Google: the spaces and direct messages the authorizing account is a member of. Paperclip has no space picker. To narrow it, authorize with an account that belongs to fewer spaces.

Reviewed operations:

| Operation | Group |
| --- | --- |
| `search-conversations`, `list-messages`, `search-messages` | Both |
| `send-message` | **Read & send** only |

> **Warning:** A sent message is visible to everyone in the space and arrives under the authorizing account's name, not an agent's. The connector's guidance is that sending should be approved — leave `send-message` on **Ask first**.

[How connector access works](access-model.md) covers identity and agent selection.

## Try it

Read a conversation you can confirm by eye, and do not post anything:

```txt
Search Google Chat for recent messages in the "deploys" space and summarize the last few. Do not send a message.
```

Compare the summary against Chat. A read is the right first check here because the alternative posts in front of colleagues.

If you do need to confirm sending, send to a direct message with yourself rather than a shared space.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Google refuses before the consent screen | Developer Preview registration is incomplete | Finish registration and retry |
| Authorization fails on a self-managed client | No Google Chat app is configured in the Cloud project | Configure the Chat app, then retry |
| **Connect with Paperclip** is not offered | The instance is not enrolled with Paperclip Cloud, or Cloud is not advertising the Chat profile | Use your own Google OAuth app |
| A space is missing from results | The authorizing account is not a member of it | Join the space in Google Chat; no reconnect needed |
| `send-message` is absent | The connection was made with **Read only** | Make a connection with **Read & send** |
| People expect to message an agent and get no reply | Google Chat is not a Paperclip conversation channel | Use a supported channel instead |
| **Needs attention** | The Google token expired or was revoked | Select **Reconnect** |

Limitations: one connection covers one Google account. Creating, joining, or leaving spaces and changing memberships are not exposed. Reactions, message editing, and deletion are not available. Developer Preview applies.

## Related guides

- [Slack](slack.md), [Discord](discord.md), [Microsoft Teams](microsoft-teams.md), [Telegram](telegram.md) — channels people can use to reach an agent.
- [Google Workspace Search](google-workspace-search.md) — one read-only search across Gmail, Drive, Calendar, and Chat.
- [How connector access works](access-model.md)
- [Google Chat API MCP reference](https://developers.google.com/workspace/chat/api/reference/mcp)
