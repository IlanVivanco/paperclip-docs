---
seo_title: Paperclip Connectors
seo_description: Every service Paperclip can connect, grouped by what it is for, with the access model, action permissions, and a setup guide behind each one.
---

# Connectors

A **connector** is a saved connection to an outside service: a Gmail mailbox, a GitHub organization, a Notion workspace, a PostHog project. You set one up once, decide who and what it is for, and Paperclip carries that decision into every run.

> **Warning:** Draft against an unreleased snapshot. These pages document the connector surface at Paperclip App commit `ae063299` (15 September 2026). The most recent tagged release, [v2026.831.1](reference/changelog.md), shipped a much smaller catalog. Nothing here tells you what your installed version can do — open **Connectors** in your own instance and compare.

## Start here

- [Connect your first connector](connectors/first-connector.md) — a worked setup, end to end, finishing with one read-only task an agent actually runs.
- [How connector access works](connectors/access-model.md) — identities, grants, agent selection, and what "effective policy" means.

## What you can connect

The **Connectors** list holds three kinds of connection. They look alike — each one is a credential Paperclip stores for you — but you set them up differently and different people use them.

**App integrations** let agents work with information and actions inside an app you already use: read a Notion page, open a Linear issue, look at a Sentry error, search a Drive folder. Setup ends in a list of individual actions you switch on or off. The agent starts the work.

**Model providers** supply the credential Paperclip uses to run models. Setup ends in a stored key or subscription, and there is no action list, because nothing here is a tool an agent can call. Paperclip uses it on the agent's behalf whenever the agent thinks. If you have ever wondered why your Anthropic connection has no permissions to set, this is why.

**Chat channels** let people talk to your agents from a messaging app. Setup ends in an app or bot you register with the provider, pointed at a Paperclip webhook. A person starts the work by sending a message, and the conversation becomes a Paperclip task.

One service can do more than one of these. GitHub and Slack are both app integrations and chat channels, and the two purposes are set up separately, with separate credentials — connecting one does not connect the other. Google Chat is the other way round: it is an app integration, so agents read and post in it, but people cannot use it to talk to an agent.

## Connection methods

Every row in the catalog lists the methods that connector supports. The names mean the same thing everywhere:

| Method | What it means |
| --- | --- |
| Connect with Paperclip | One click. Paperclip holds the OAuth client and you approve access in the provider's own consent screen. Offered only on instances enrolled with Paperclip Cloud. |
| Sign in with the provider | One click. Paperclip registers itself with the provider's authorization server at connect time, then you approve access there. Nothing to create first. |
| Your own OAuth app | You register an OAuth client with the provider and add Paperclip's callback URI before connecting. Use this when the provider does not support automatic registration, or when you want the client to be yours. |
| API key | You generate a key or token in the provider's console and paste it into Paperclip. |
| Provider app registration | You create an app or bot in the provider's developer console, give it the documented permissions and events, and connect its credentials. Every chat channel works this way. |
| No credential | Nothing to sign in to. You identify the target — a store domain, a generated URL, a shared file — and that is the whole setup. |

Which methods you actually see depends on your instance. **Connect with Paperclip** is hidden unless your instance is enrolled with Paperclip Cloud and Cloud advertises a profile for that connector. Every chat channel, and AgentMail's email inboxes with them, is behind the **Chat connectors** instance setting, which is off by default. Each connector page lists its own prerequisites.

## The catalog

Find an app and open its setup guide.

### Google Workspace

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Gmail](connectors/gmail.md) | Google's email service. Agents search and read mail, and on a draft connection create drafts for you to review in Gmail. Sending, deleting, and relabelling mail are never enabled. | Connect with Paperclip · Your own OAuth app |
| [Google Calendar](connectors/google-calendar.md) | Google's calendar. Agents read calendars, and on a write connection create and change events. | Connect with Paperclip · Your own OAuth app |
| [Google Chat](connectors/google-chat.md) | Google Workspace's team messaging. Agents search and read conversations, and on a write connection post messages. This is an agent tool, not a way for people to talk to an agent. | Connect with Paperclip · Your own OAuth app |
| [Google Docs](connectors/google-docs.md) | Google's word processor. Agents read documents, and on a write connection edit them. | Connect with Paperclip · Your own OAuth app |
| [Google Drive](connectors/google-drive.md) | Google's file storage. Agents search and read files, and on a write connection create and copy them. | Connect with Paperclip · Your own OAuth app |
| [Google People](connectors/google-people.md) | The contacts and directory behind a Google account. Agents look up people and profiles. Read-only; there is no write connection. | Connect with Paperclip · Your own OAuth app |
| [Google Sheets](connectors/google-sheets.md) | Google's spreadsheets. Agents read sheets, and on a write connection update them. A third path shares individual spreadsheets with a Paperclip robot account instead of connecting a Google identity at all. | Connect with Paperclip · Your own OAuth app · No credential |
| [Google Slides](connectors/google-slides.md) | Google's presentations. Agents read decks, and on a write connection edit them. | Connect with Paperclip · Your own OAuth app |
| [Google Workspace Search](connectors/google-workspace-search.md) | One read-only search that spans Gmail, Drive, Calendar, and Chat in a single Google account. Use it when an agent needs to find something without knowing which app holds it. | Connect with Paperclip · Your own OAuth app |

> **Note:** Google runs the Workspace connectors through a Developer Preview. Google has to register both the Workspace email that authorizes Paperclip and the Cloud project that owns the OAuth client before any of these will connect. [Set up Gmail](connectors/gmail-setup.md) covers that enrollment once; the other eight follow the same path.

### Productivity and collaboration

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Asana](connectors/asana.md) | Work management for team projects, tasks, and goals. Agents work with the projects and tasks your Asana app can reach. | Your own OAuth app |
| [Jira](connectors/jira.md) | Atlassian's issue tracker for software teams. Agents work with the issues on the Jira site you connect. | Sign in with Jira |
| [Linear](connectors/linear.md) | Issue tracking for product and engineering teams. Agents create, update, and read issues across whatever the authorizing Linear account can reach. | Your own OAuth app |
| [Miro](connectors/miro.md) | Shared online whiteboards for diagrams, planning, and workshops. Agents work with the boards your Miro account can reach. | Sign in with Miro |
| [Todoist](connectors/todoist.md) | Task lists for individuals and small teams. Agents work with the tasks and projects in your Todoist account. | Sign in with Todoist |
| [Zapier](connectors/zapier.md) | Automation service that wires thousands of apps together. You choose the actions in Zapier and paste one generated URL, so the agent gets the actions you put in it. Treat that URL as a secret — its token is part of the address. | Generated MCP URL |

### Communication

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [AgentMail](connectors/agentmail.md) | Email inboxes built for software agents. Gives an agent its own inbox and turns each email conversation into a Paperclip task. Behind the **Chat connectors** setting, like the chat channels. | API key |
| [Resend](connectors/resend.md) | Transactional email delivery for developers. Agents work with the sending domains and delivery records your Resend account can reach. | Sign in with Resend |
| [Slack](connectors/slack.md) | Team messaging. Two separate purposes: as an app integration agents read and post in the workspace, limited by the authorizing account's channel access; as a chat channel people work with one agent from Slack. | Your own OAuth app · Provider app registration |

### Developer tools

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Cloudflare](connectors/cloudflare.md) | DNS, CDN, and edge compute. Agents work with the account your Cloudflare sign-in can reach. | Sign in with Cloudflare · API key |
| [GitHub](connectors/github.md) | Code hosting and review. Two separate purposes: as an app integration agents read and act on the organizations and repositories you pick; as a chat channel people work with one agent from issue and pull-request comments. Neither is the same as giving an agent `git` and `gh` inside a workspace. | Connect with Paperclip · API key · Provider app registration |
| [Netlify](connectors/netlify.md) | Hosting and deploys for web front ends. Agents work with the teams and sites your Netlify account can reach. | Sign in with Netlify |
| [PagerDuty](connectors/pagerduty.md) | On-call scheduling and incident response. Agents work with the incidents, services, and schedules your token can reach. Choose the US or EU service region when you connect. | API key |
| [Postman](connectors/postman.md) | API development and testing workspace. Agents work with the collections and APIs your Postman account can reach. Pick how much access to grant: read-only, code generation, or full write. | Sign in with Postman · API key |
| [Sentry](connectors/sentry.md) | Error and performance monitoring. Agents investigate errors, releases, and production issues in the Sentry organization you authorize. | Sign in with Sentry · Your own OAuth app |

### Data and analytics

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Airtable](connectors/airtable.md) | Spreadsheet-database hybrid for structured team data. Agents work with the bases your Airtable sign-in can reach. | Sign in with Airtable |
| [ClickHouse](connectors/clickhouse.md) | Columnar database built for analytical queries over very large datasets. Agents query the ClickHouse Cloud service you name. | Sign in with ClickHouse |
| [Mixpanel](connectors/mixpanel.md) | Product analytics for user and event behaviour. Agents work with the events and reports your Mixpanel account can reach. | Sign in with Mixpanel |
| [PostHog](connectors/posthog.md) | Product analytics with session replay, feature flags, and experiments. Agents analyse product usage, errors, flags, and experiments. | Sign in with PostHog · API key |
| [Supabase](connectors/supabase.md) | Hosted Postgres with authentication, storage, and edge functions. Agents work with the Supabase project you scope the connection to. Use a development project. | Sign in with Supabase · API key |

Google Sheets is the other common home for tabular data; it sits under [Google Workspace](#google-workspace) with the rest of the suite.

### Content and design

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Box](connectors/box.md) | Enterprise file storage and sharing. Agents work with the files and folders your Box integration can reach. | Your own OAuth app |
| [Cloudinary](connectors/cloudinary.md) | Image and video hosting with on-the-fly transformation. Agents work with the assets your Cloudinary roles allow. | Sign in with Cloudinary |
| [Notion](connectors/notion.md) | Workspace for notes, documents, and databases. Agents read and update the pages and databases you share with the connection at Notion's consent screen. | Sign in with Notion · Your own OAuth app |
| [Webflow](connectors/webflow.md) | Visual website builder with a CMS behind it. Agents work with the sites and collections your Webflow roles allow. | Sign in with Webflow |
| [Wix](connectors/wix.md) | Website builder and hosting. Agents work with the sites your Wix account can reach. | Sign in with Wix |

### Commerce and finance

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Shopify](connectors/shopify.md) | E-commerce platform for online stores. Agents search a store's products and policies and manage shopping carts. You give a store domain; there is no sign-in, and no access to the store's admin. | No credential |
| [Stripe](connectors/stripe.md) | Payments, invoicing, and billing. Agents read customers, invoices, and payouts in the account you connect. | Sign in with Stripe · API key |

### AI tools

Services whose subject matter is machine learning. They are ordinary app integrations with action lists, which is what separates them from the [model providers](#model-providers) below.

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Hugging Face](connectors/hugging-face.md) | Public hub for open machine-learning models, datasets, and demos. Agents search models, datasets, and Spaces. The sign-in asks for a read-only scope, which makes this the shortest connector to try first. | Sign in with Hugging Face |
| [Mem0](connectors/mem0.md) | Hosted long-term memory for AI applications. Agents store and recall facts across runs in your Mem0 project. | API key |

### Model providers

These hold the credential Paperclip uses to run models. They publish no actions and appear in no permission list. See [Agent adapters](guides/org/agent-adapters.md) for which adapter uses which provider.

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Anthropic](connectors/anthropic.md) | Run Claude models. A subscription signs in with your Claude plan; an API key can be scoped and rotated separately. | Claude subscription · API key |
| [OpenAI](connectors/openai.md) | Run OpenAI models. | OpenAI subscription · API key |
| [OpenRouter](connectors/openrouter.md) | Run models from many vendors through one credential and one bill. | API key |
| [Grok](connectors/xai.md) | Run xAI's Grok models. | Grok subscription · API key |

### Chat channels

These give people a place to talk to an agent. Setup registers an app or bot with the provider and points it at a Paperclip webhook; one connection carries one agent.

| Connector | What you can do | Connection methods |
| --- | --- | --- |
| [Discord](connectors/discord.md) | Mention the agent in a server channel and Paperclip opens a thread, keeping it tied to one task. | Provider app registration |
| [GitHub](connectors/github.md) | Work with the agent from issue and pull-request comments. Set up separately from the GitHub agent tool on the same page. | Provider app registration |
| [iMessage Photon](connectors/imessage-photon.md) | Message the agent from Apple Messages through a Photon Cloud project. Shared Pro lines carry direct messages; a dedicated line also carries groups you enable. | Provider app registration |
| [Microsoft Teams](connectors/microsoft-teams.md) | Message the agent in a chat, a team channel, or a group chat. Needs a work or school Microsoft 365 organization; personal Teams accounts cannot complete the setup. | Provider app registration |
| [Slack](connectors/slack.md) | Message the agent directly, or mention it in a channel to start a task from that thread. Set up separately from the Slack agent tool on the same page. | Provider app registration |
| [Telegram](connectors/telegram.md) | Message the agent through a bot you create with BotFather. | Provider app registration |

## Can't find your app?

The catalog above is what this snapshot offers. If the service you want is not in it, these are the paths that exist.

**Check your own instance first.** This page is written against one pinned commit. Your installed version may list fewer connectors, and the methods it offers you depend on whether the instance is enrolled with Paperclip Cloud and whether chat channels are switched on. What **Connectors** shows you is authoritative; this page is not.

**Connect it as a custom server.** If the service publishes its own remote MCP server, you can connect it directly without waiting for a catalog entry. It gets the same identity, grant, agent-selection, and per-action controls as a catalog connector. See [Connect a custom MCP server](connectors/custom-mcp-servers.md) for the compatibility requirements and the two ways to supply a URL.

**Reach it through automation you already own.** [Zapier](connectors/zapier.md) covers a long tail of apps that have no MCP server of their own. You pick the actions on Zapier's side, which also means the agent cannot exceed them.

**Give the agent a workspace instead.** Some work does not need a connector at all. Anything an agent can do with a shell and a CLI belongs in an execution workspace — see [Connect an agent to a GitHub repo](how-to/connect-agent-to-github.md) for the pattern, and [Add an MCP server to an agent](how-to/add-mcp-server-to-agent.md) for the adapter-level route.

**If the provider gates access.** A few providers review and approve MCP clients before an independently registered one will work. Nothing you do in Paperclip changes that, and the approval has to come from the provider. [Providers Paperclip recognizes but does not list](connectors/recognized-providers.md) names the ones in this snapshot and what each is waiting on.

## What a connection does not grant

Two things surprise people, and both are worth knowing before you connect anything.

**A connector is not a permission.** Connecting Notion does not let every agent edit your Notion. The connection holds the credential; a separate set of choices decides which humans it belongs to, which agents may use it, and which individual actions those agents may call. [How connector access works](connectors/access-model.md) is the short version, and [Set action permissions](connectors/action-permissions.md) is the control itself.

**Most action lists come from the provider, not from Paperclip.** For a connector that talks to a provider-hosted server, the provider publishes the tools. Paperclip reads that list, classifies each entry as read, write, or destructive, and lets you set each one to **Allowed**, **Ask first**, or **Off**. When the provider changes its server, your list changes with it — so the authoritative list of what a connector can do is the one in your own instance, not the one on its page here.

## Shared guides

The mechanics below are the same for every connector, so each connector page links here instead of repeating them.

| Guide | Use it when |
| --- | --- |
| [Share a connector with people and agents](connectors/share-access.md) | Deciding who the credential belongs to and which agents may use it. |
| [Use separate accounts for people and agents](connectors/separate-accounts.md) | One agent needs its own account rather than borrowing a person's. |
| [Set action permissions](connectors/action-permissions.md) | Turning individual actions to Allowed, Ask first, or Off. |
| [Answer a connector review request](connectors/review-requests.md) | An agent is waiting on your OK for an Ask-first action. |
| [Verify a connector and fix a broken one](connectors/verify-and-troubleshoot.md) | Checking a new connection, or a working one has stopped. |
| [Reauthorize, revoke, or disconnect](connectors/reauthorize-and-disconnect.md) | Rotating a credential, removing one person's access, or deleting the connection. |
| [Connect a custom MCP server](connectors/custom-mcp-servers.md) | The service is not in the catalog, or you have a URL or config to paste. |

## Related

- [Tool Gateway](reference/api/tool-gateway.md) — what sits between an agent's tool call and the outside service.
- [Providers Paperclip recognizes but does not list](connectors/recognized-providers.md) — the withheld and provider-gated inventory in this snapshot.
- [Add an MCP server to an agent](how-to/add-mcp-server-to-agent.md) — the adapter-level path, which is separate from connectors.
- [Connect an agent to a GitHub repo](how-to/connect-agent-to-github.md) — git and `gh` inside a workspace, which is not the same thing as the GitHub connector.
- [Connections v3 (Apps)](experimental/connections-apps.md) — the storage and authorization foundation these connectors are built on.
