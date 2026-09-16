---
seo_title: Microsoft Teams Connector
seo_description: Let people start Paperclip work from Microsoft Teams. Entra app and Azure Bot setup, tenant admin approval, what the RSC grants expose, and troubleshooting.
---

# Microsoft Teams

People message your agent in Microsoft Teams — in a personal chat, a team channel, or a group chat — and Paperclip starts work.

This is the most involved channel to set up. It needs an Entra application, a single-tenant Azure Bot, a Teams app package, and tenant administrator approval. Budget real time for it, and read the access note below before you install.

> **Warning:** A personal or free Teams account at `teams.live.com` cannot complete this setup. You need a Microsoft 365 work or school organization where you can register an Entra application.

## Before you connect

- **Chat connectors** must be switched on for the instance. It is an experimental setting, off by default, enabled by an instance administrator under experimental settings.
- A Microsoft 365 work or school tenant, and permission to register an Entra application in it.
- A tenant administrator who can grant the application's permissions and allow the Teams app to be installed. If that is not you, involve them before starting — the setup cannot be finished without them.
- The agent that will answer.

## What the installation can read

This matters more here than on the other channels, so decide it before you install.

The Teams app uses two resource-specific consent permissions, **ChannelMessage.Read.Group** and **ChatMessage.Read.Chat**. Where the app is installed, those let it receive **every message in that team or group chat, whether or not anyone mentions the agent.**

That is how Teams delivers messages to an installed bot, not a Paperclip choice, but the consequence is yours to manage: tell the people in a team what the app can see before you install it there, and install it only where that is acceptable. A personal chat with the bot exposes only that chat.

## Connect Microsoft Teams

### 1. Register the Entra application

In the Microsoft Entra admin centre, register a single-tenant application and create a client secret. Note three values:

- **Application / Client ID**
- **Directory / Tenant ID**
- **Client secret** — copy the secret *value*, which Entra shows only once

### 2. Create the Azure Bot and Teams app

1. Create a single-tenant Azure Bot backed by that application.
2. In the [Teams Developer Portal](https://dev.teams.microsoft.com/apps), build the app package for the bot.
3. Enable the **personal**, **team**, and **groupChat** bot scopes, so the agent can be reached in all three contexts.
4. Add the **ChannelMessage.Read.Group** and **ChatMessage.Read.Chat** resource-specific application permissions.
5. Have a tenant administrator grant consent, then upload or install the app.

Microsoft's walkthrough is [Create a bot for Teams](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/create-a-bot-for-teams).

### 3. Connect it in Paperclip

1. Open **Connectors** and select **Microsoft Teams**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Paste the **Application / Client ID**, **Directory / Tenant ID**, and **Client secret**.
4. Choose the agent that will answer, and finish.

## How a conversation becomes work

| In Teams | In Paperclip |
| --- | --- |
| Someone messages the bot in a personal chat | A task is created for the connected agent |
| Someone posts in a team channel or group chat where the app is installed | Paperclip receives the message and routes it to the connected agent |
| The conversation continues | Replies continue the same task |

## Choose access

Reach is decided by where the app is installed, in Teams, not in Paperclip. There is no team or channel picker on the connection.

One team installation covers that team's **standard** channels. **Private and shared channels need their own installation and are not supported in this release** — an agent will not see messages in them, so do not plan work around a private channel.

The connection's identity and agent settings work as for any connector; see [How connector access works](access-model.md). The answering agent is set on the connection.

## Try it

Start in a personal chat, which exposes the least:

1. In Teams, open a personal chat with the app and send `hello, can you confirm you are connected?`
2. Expect a reply in that chat within a few moments.
3. Confirm a matching task appears in Paperclip, assigned to the connected agent.

Only after that works, install into a team — and tell its members what the app can read first.

> **Note:** Procedure, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Microsoft Teams does not appear in **Connectors** | **Chat connectors** is off for the instance | Ask an administrator to enable it |
| The app cannot be registered or installed | The account is a personal or free Teams account | Use a Microsoft 365 work or school tenant |
| Consent cannot be completed | The permissions need tenant administrator approval | Ask a tenant administrator to grant consent |
| Authentication fails after setup | The client secret was copied from the ID field, or has expired | Create a new secret, copy its value, and reconnect |
| The bot replies in personal chats but not a channel | The app is not installed in that team, or the channel is private or shared | Install into the team; private and shared channels are not supported |
| Messages arrive but no task is created | The connection is unhealthy, or no agent is assigned | Check the connection's status and assigned agent |
| People are surprised the bot sees everything | The RSC grants deliver all messages in the installed team or chat | Explain the access, or uninstall from that team |

Limitations: one tenant and one agent per connection. No private or shared channel support. Paperclip cannot narrow what an installed app receives — that is fixed by the Teams permission model.

## Related guides

- [Slack](slack.md), [Discord](discord.md), [Telegram](telegram.md) — other conversation channels.
- [How connector access works](access-model.md)
- [Create a bot for Teams](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/create-a-bot-for-teams)
