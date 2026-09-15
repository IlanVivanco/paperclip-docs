---
seo_title: iMessage Photon Connector
seo_description: Message a Paperclip agent from Apple Messages using Photon Cloud. Pro supports DMs; dedicated lines also support groups. Set it up in Paperclip with a.
---

# iMessage Photon

Message a Paperclip agent from Apple Messages using Photon Cloud. Pro supports DMs; dedicated lines also support groups.

## What this connector does

iMessage Photon is a **chat connector**. It gives people a place to talk to a Paperclip agent; it does not give agents tools to call. Chat connector setup is behind the **Chat connectors** instance flag, which is off by default.

| | |
| --- | --- |
| Catalog slug | `imessage-photon` |
| Category | Communication |
| Transport | `chat_sdk` |
| Highest risk tier | S3 — account data that can be changed. |

## Before you start

- An account with the provider, and permission in Paperclip to create a connection. Sharing one with the whole company or with a dedicated agent identity additionally needs the connection-manager permission.

## Supported setup paths

Open **Connectors**, find **iMessage Photon**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Chat with an agent

Let people in iMessage Photon start and continue work with one Paperclip agent.

- Sign-in style: API key
- OAuth client: your own client or key
- Risk tier: S3

| Field | Required | What it is |
| --- | --- | --- |
| **Project secret** | Yes | Credential value; Paperclip stores it as a secret. |

Provider console: [register an app](https://photon.codes/) · [provider docs](https://photon.codes/docs/spectrum-ts/providers/imessage/connection-and-routing)

## Accounts and access

iMessage Photon follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

None. A chat connector carries messages between a person and an agent; it does not publish an action list.

## Authorization sequence

There is no browser handshake. Paperclip stores the value you supply as a secret and presents it to the server on each call; the connection is created by `POST /api/companies/{companyId}/tools/apps/connect` and completed by `POST /api/companies/{companyId}/tools/apps/{connectionId}/finish`.

## Check that it works

Send one message to the agent from iMessage Photon and confirm a task appears in Paperclip. Do not test with a message you would not want an agent to act on.

## If something goes wrong

| What you see | What it means |
| --- | --- |
| **Setup incomplete** | The connection record exists but setup never finished. Select **Finish setup**. |
| **Needs attention** | The credential stopped working. Select **Reconnect** and sign in again. |
| **Paused** | Agents cannot use the connection right now. |

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) covers the rest.

## Related

- [Connectors](../connectors.md)
- [How connector access works](access-model.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
