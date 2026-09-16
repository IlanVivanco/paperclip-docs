---
seo_title: iMessage Photon Connector
seo_description: Let people message a Paperclip agent from Apple Messages using Photon Cloud. Line types, sender enrollment, group support, and troubleshooting.
---

# iMessage Photon

People message your agent from Apple Messages, and Paperclip starts work. Delivery runs through [Photon Cloud](https://photon.codes/), a third-party service that provides the iMessage line.

> **Note:** This does not give Paperclip access to your own Messages history, your Apple ID, or a Mac you own. Nothing is installed locally. The agent is reachable at a line Photon operates, and only conversations on that line reach Paperclip.

## Before you connect

- **Chat connectors** must be switched on for the instance. It is an experimental setting, off by default, enabled by an instance administrator under experimental settings.
- A Photon Cloud account and project, and the project's **project secret**.
- A decision about which kind of line you need — see below. It determines whether groups work at all.
- The agent that will answer.

## Choose the line type first

Photon offers two arrangements, and they differ in a way that affects what you can build:

| Line | Direct messages | Group chats |
| --- | --- | --- |
| **Pro (shared line)** | Yes, after each sender is enrolled in Photon and their identity is linked in Paperclip | No |
| **Dedicated line** | Yes | Yes, for groups you enable individually |

A shared Pro line needs per-sender setup, so it suits a small known set of people. A dedicated line is the option if you need group conversations or an open audience. Check current line availability and pricing with Photon.

## Connect iMessage Photon

1. In Photon, create the project and note its **project secret**.
2. Open **Connectors** and select **iMessage Photon**.
3. On the **Access** step, choose the identity and which agents may use the connection.
4. Paste the **Project secret**.
5. Choose the agent that will answer, and finish.
6. On a Pro shared line, enrol each sender in Photon and link their identity in Paperclip. On a dedicated line, enable each group chat you want the agent to take part in.

Photon's [connection and routing guide](https://photon.codes/docs/spectrum-ts/providers/imessage/connection-and-routing) covers the provider side.

> **Danger:** The project secret authenticates the whole Photon project. Store it only in Paperclip, and rotate it in Photon if it is ever exposed.

## How a conversation becomes work

| In Messages | In Paperclip |
| --- | --- |
| An enrolled sender messages the line | A task is created for the connected agent |
| They keep replying | The conversation continues on the same task |
| A message arrives in an enabled group, on a dedicated line | Routed to the connected agent as group context |

## Choose access

Who can reach the agent is controlled in Photon, not Paperclip. On a Pro line it is the set of enrolled senders plus their identity links; on a dedicated line it is whoever can message that line, plus the groups you enabled.

Identity linking is what lets Paperclip attribute a conversation to a person. An unlinked sender on a Pro line will not get through, which is the intended behaviour rather than a fault.

The connection's identity and agent settings work as for any connector; see [How connector access works](access-model.md). The answering agent is set on the connection.

## Try it

1. From an enrolled Apple device, message the line: `hello, can you confirm you are connected?`
2. Expect a reply in Messages within a few moments.
3. Confirm a matching task appears in Paperclip, assigned to the connected agent.

Use your own enrolled number first. On a dedicated line, confirm a direct message works before enabling any group.

> **Note:** Procedure, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| iMessage Photon does not appear in **Connectors** | **Chat connectors** is off for the instance | Ask an administrator to enable it |
| A sender's message never arrives, on a Pro line | They are not enrolled in Photon, or their identity is not linked in Paperclip | Enrol the sender and link the identity |
| Group messages are ignored | Groups need a dedicated line, and each group must be enabled | Move to a dedicated line and enable the group |
| Messages stop after working | The project secret was rotated in Photon | Reconnect with the current secret |
| Delivery is delayed or fails for everyone | A Photon-side problem, not Paperclip | Check Photon's status and project configuration |
| The wrong agent answers | The answering agent is set on the connection | Change it on the connection |

Limitations: one Photon project and one agent per connection. No group support on a Pro shared line. Paperclip depends on Photon for delivery, so its availability bounds this connector's. There is no local or native Apple Messages integration.

## Related guides

- [Discord](discord.md), [Slack](slack.md), [Telegram](telegram.md), [Microsoft Teams](microsoft-teams.md) — other conversation channels.
- [How connector access works](access-model.md)
- [Photon iMessage connection and routing](https://photon.codes/docs/spectrum-ts/providers/imessage/connection-and-routing)
