---
seo_title: Paperclip Connectors
seo_description: Every connector Paperclip can set up today, grouped by what it is for, with the access model, action permissions, and setup guides behind each one.
---

# Connectors

A **connector** is a saved connection to an outside service that your agents can use: a Gmail mailbox, a GitHub organization, a Notion workspace, a PostHog project. You set one up once, decide who and what it is for, and Paperclip carries that decision into every run.

> **Draft against an unreleased snapshot.** These pages document the connector surface at Paperclip App commit `13368c51` (13 September 2026). The most recent tagged release, [v2026.831.1](reference/changelog.md), shipped a much smaller catalog. Do not treat this page as a list of what your installed version can do — open **Connectors** in your own instance and compare.

Three things are worth knowing before you connect anything.

**A connector is not a permission.** Connecting Notion does not let every agent edit your Notion. The connection holds the credential; a separate set of choices decides which humans it belongs to, which agents may use it, and which individual actions those agents may call. [How connector access works](connectors/access-model.md) is the short version.

**Most action lists come from the provider, not from Paperclip.** For a remote MCP connector, the provider's server publishes the tools. Paperclip reads that list, classifies each entry as read, write, or destructive, and lets you set each one to **Allowed**, **Ask first**, or **Off**. When the provider changes its server, your list changes too.

**Two connectors are not agent tools at all.** Model accounts supply the credential a runtime uses to talk to Anthropic, OpenAI, OpenRouter, or xAI. Chat connectors give people a place to talk to an agent from Slack, Discord, Teams, Telegram, or Messages. Neither publishes actions. They are in the same list because they are the same kind of saved credential.

## Start here

- [Connect your first connector](connectors/first-connector.md) — about ten minutes, ending in one read-only task an agent actually runs.
- [How connector access works](connectors/access-model.md) — identities, grants, agent selection, and what "effective policy" means.

## The catalog

Every connector below is in the **Connectors** list in the app. The three columns are the connector, what the catalog says it is for, and the setup paths Paperclip supports for it.

### Google Workspace

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Gmail](connectors/gmail.md) | Search and read Gmail messages and create drafts without enabling mail sending. | Connect with Paperclip · Your own OAuth app |
| [Google Calendar](connectors/google-calendar.md) | Read calendars and manage Google Calendar events. | Connect with Paperclip · Your own OAuth app |
| [Google Chat](connectors/google-chat.md) | Search and read Google Chat conversations and send messages. | Connect with Paperclip · Your own OAuth app |
| [Google Docs](connectors/google-docs.md) | Read and update Google Docs documents. | Connect with Paperclip · Your own OAuth app |
| [Google Drive](connectors/google-drive.md) | Search, read, create, and copy files in Google Drive. | Connect with Paperclip · Your own OAuth app |
| [Google People](connectors/google-people.md) | Search contacts and directory profiles with the Google People API. | Connect with Paperclip · Your own OAuth app |
| [Google Sheets](connectors/google-sheets.md) | Read and update Google Sheets spreadsheets. | Connect with Paperclip · Your own OAuth app · No sign-in |
| [Google Slides](connectors/google-slides.md) | Read and update Google Slides presentations. | Connect with Paperclip · Your own OAuth app |
| [Google Workspace Search](connectors/google-workspace-search.md) | Search Gmail, Drive, Calendar, and Chat through one read-only Google Workspace search tool. | Connect with Paperclip · Your own OAuth app |

### Developer tools

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Cloudflare](connectors/cloudflare.md) | Connect Cloudflare's provider-hosted MCP server. | Browser sign-in · API key |
| [GitHub](connectors/github.md) | Give agents repository tools or let people work with an agent from GitHub issues and pull requests. | Connect with Paperclip · API key · App registration |
| [Netlify](connectors/netlify.md) | Connect Netlify's provider-hosted MCP server. | Browser sign-in |
| [PagerDuty](connectors/pagerduty.md) | Connect PagerDuty's provider-hosted MCP server. | API key |
| [Postman](connectors/postman.md) | Connect Postman's provider-hosted MCP server. | Browser sign-in · API key |
| [Sentry](connectors/sentry.md) | Investigate errors, releases, and production issues. | Browser sign-in |

### Productivity

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Asana](connectors/asana.md) | Connect Asana's provider-hosted MCP server. | Your own OAuth app |
| [Jira](connectors/jira.md) | Connect Jira's provider-hosted MCP server. | Browser sign-in |
| [Linear](connectors/linear.md) | Create, update, and read Linear issues. | Your own OAuth app |
| [Miro](connectors/miro.md) | Connect Miro's provider-hosted MCP server. | Browser sign-in |
| [Todoist](connectors/todoist.md) | Connect Todoist's provider-hosted MCP server. | Browser sign-in |
| [Zapier](connectors/zapier.md) | Reach thousands of apps through your Zapier account. | No sign-in |

### Communication

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [AgentMail](connectors/agentmail.md) | Give agents email inboxes and handle each conversation as a task. | API key |
| [Resend](connectors/resend.md) | Connect Resend's provider-hosted MCP server. | Browser sign-in |
| [Slack](connectors/slack.md) | Give agents Slack tools or let people start and continue Paperclip work from Slack. | Your own OAuth app · App registration |

### Content and files

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Box](connectors/box.md) | Connect Box's provider-hosted MCP server. | Your own OAuth app |
| [Cloudinary](connectors/cloudinary.md) | Connect Cloudinary's provider-hosted MCP server. | Browser sign-in |
| [Notion](connectors/notion.md) | Read and update pages in your Notion workspace. | Browser sign-in |
| [Webflow](connectors/webflow.md) | Connect Webflow's provider-hosted MCP server. | Browser sign-in |
| [Wix](connectors/wix.md) | Connect Wix's provider-hosted MCP server. | Browser sign-in |

### Data

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Airtable](connectors/airtable.md) | Connect Airtable's provider-hosted MCP server. | Browser sign-in |
| [ClickHouse](connectors/clickhouse.md) | Connect ClickHouse's provider-hosted MCP server. | Browser sign-in |
| [Supabase](connectors/supabase.md) | Connect Supabase's provider-hosted MCP server. | Browser sign-in · API key |

### Analytics

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Mixpanel](connectors/mixpanel.md) | Connect Mixpanel's provider-hosted MCP server. | Browser sign-in |
| [PostHog](connectors/posthog.md) | Analyze product usage, errors, feature flags, and experiments with PostHog's hosted MCP server. | Browser sign-in · API key |

### Commerce and finance

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Shopify](connectors/shopify.md) | Search a store's products and policies, and manage shopping carts. | No sign-in |
| [Stripe](connectors/stripe.md) | Connect Stripe's provider-hosted MCP server. | Browser sign-in · API key |

### AI and models

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Hugging Face](connectors/hugging-face.md) | Connect Hugging Face's provider-hosted MCP server. | Browser sign-in |
| [Mem0](connectors/mem0.md) | Connect Mem0's provider-hosted MCP server. | API key |

### Model accounts

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Anthropic](connectors/anthropic.md) | Use Anthropic APIs with a restricted key. | Subscription · API key |
| [OpenAI](connectors/openai.md) | Connect OpenAI accounts for your agents. | Subscription · API key |
| [OpenRouter](connectors/openrouter.md) | Connect OpenRouter accounts for your agents. | API key |
| [Grok](connectors/xai.md) | Connect Grok accounts for your agents. | Subscription · API key |

### Chat connectors

| Connector | What it is for | How you sign in |
| --- | --- | --- |
| [Discord](connectors/discord.md) | Let people start and continue Paperclip work with an agent from Discord. | App registration |
| [iMessage Photon](connectors/imessage-photon.md) | Message a Paperclip agent from Apple Messages using Photon Cloud. Pro supports DMs; dedicated lines also support groups. | App registration |
| [Microsoft Teams](connectors/microsoft-teams.md) | Let people start and continue Paperclip work with an agent from Microsoft Teams. | App registration |
| [Telegram](connectors/telegram.md) | Let people start and continue Paperclip work with an agent from Telegram. | App registration |
## Anything else

- [Connect a custom MCP server](connectors/custom-mcp-servers.md) — a server that is not in the list, a pasted config, or a Zapier-style generated URL.

## Shared guides

The mechanics below are the same for every connector, so each provider page links here instead of repeating them.

| Guide | Use it when |
| --- | --- |
| [Share a connector with people and agents](connectors/share-access.md) | Deciding who the credential belongs to and which agents may use it. |
| [Use separate accounts for people and agents](connectors/separate-accounts.md) | One agent needs its own account rather than borrowing a person's. |
| [Set action permissions](connectors/action-permissions.md) | Turning individual actions to Allowed, Ask first, or Off. |
| [Answer a connector review request](connectors/review-requests.md) | An agent is waiting on your OK for an Ask-first action. |
| [Verify a connector and fix a broken one](connectors/verify-and-troubleshoot.md) | Checking a new connection, or a working one has stopped. |
| [Reauthorize, revoke, or disconnect](connectors/reauthorize-and-disconnect.md) | Rotating a credential, removing one person's access, or deleting the connection. |

## Recognized but not in the list

Paperclip still understands these providers, so connections created earlier keep working and keep their action permissions, but they are withheld from the **Connectors** list. They are not documented here.

| Connector | Status |
| --- | --- |
| beehiiv (`beehiiv`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Bitly (`bitly`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Brex (`brex`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Candid (`candid`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Coda (`coda`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Composio (`composio`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Context7 (`context7`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Egnyte (`egnyte`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Embat (`embat`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Kernel (`kernel`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Local Falcon (`local-falcon`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Make (`make`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Manufact (`manufact`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| O'Reilly (`oreilly`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| PlanetScale (`planetscale`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Razorpay (`razorpay`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Sanity (`sanity`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Similarweb (`similarweb`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Ticket Tailor (`ticket-tailor`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| TickTick (`ticktick`) | Recognized, not listed in **Connectors**. Existing connections keep working. |
| Xero (`xero`) | Recognized, not listed in **Connectors**. Existing connections keep working. |

| Provider | Why it is not offered |
| --- | --- |
| G2 (`g2`) | Requires provider approval (`provider_approval`); no self-serve path. |
| Vercel (`vercel`) | Requires provider approval (`provider_approval`); no self-serve path. |
| Zomato (`zomato`) | Requires provider approval (`provider_approval`); no self-serve path. |

## Related

- [Tool Gateway](reference/api/tool-gateway.md) — what sits between an agent's tool call and the outside service.
- [Add an MCP server to an agent](how-to/add-mcp-server-to-agent.md) — the adapter-level path, which is separate from connectors.
- [Connect an agent to a GitHub repo](how-to/connect-agent-to-github.md) — git and `gh` inside a workspace, which is not the same thing as the GitHub connector.
- [Connections v3 (Apps)](experimental/connections-apps.md) — the storage and authorization foundation these connectors are built on.
