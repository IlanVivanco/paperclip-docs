---
seo_title: PostHog Connector
seo_description: Let agents analyze product usage, errors, feature flags, and experiments in PostHog. Project pinning, read-only mode, why risk classification is conservative, and troubleshooting.
---

# PostHog

Agents can query product analytics, investigate errors, and inspect feature flags and experiments in PostHog.

PostHog has a large and fast-moving tool catalog, which shapes how Paperclip handles it: unknown tools are treated as writes rather than reads, and new tools arrive switched off. That is deliberate, and it is explained below.

## Before you connect

- A PostHog account with access to the project you want agents to use.
- Optionally, the project ID you intend to pin to. You can find it in PostHog's project settings.

## Connect PostHog

1. Open **Connectors** and select **PostHog**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose how to authenticate:
   - **Sign in with PostHog** — browser sign-in, the quickest path.
   - **Use a personal API key** — paste a PostHog personal API key.
4. Optionally set the advanced controls below, then finish.

The defaults work without touching anything else.

## Narrow the connection

PostHog is one of the few connectors with real scoping controls in Paperclip, and they are worth using:

| Control | What it does |
| --- | --- |
| **Pin to project ID** | Ties the connection to one project and removes PostHog's project-switching tool, so an agent cannot move to another project |
| **Read-only mode** | Hides the tools that can change PostHog data |
| **Feature groups** | Leave blank for every feature group, or list the ones you want |
| **Individual tools** | Leave blank for all tools, or name exactly the ones to expose |

Pinning to a project is the single most useful setting here. Without it, an agent with the connection can switch between every project the account can see.

For an analysis-only agent, pin the project and turn on read-only mode. That combination gives a narrow, predictable surface.

## Choose access

Project reach is the PostHog account's, unless you pin. Within that, Paperclip's action settings apply as usual.

Risk classification is deliberately conservative for this provider:

- A PostHog tool that PostHog does not explicitly annotate as read-only is classified **write**, not read. Silently assuming "read" for an unfamiliar tool is the failure worth avoiding when the catalog changes often.
- The `exec` tool is always classified **destructive**, whatever else it looks like.
- New connections start in a safe posture, and newly discovered tools arrive switched off rather than inheriting a permissive default.

The practical effect is that you will see more tools defaulting to review than on other connectors. That is the intended behaviour, not a misclassification. See [Set action permissions](action-permissions.md).

## Try it

```txt
In PostHog, how many pageviews did we get in the last 7 days? Do not create or change anything.
```

Compare against the same figure in the PostHog UI. A small, bounded query is the right first check — avoid asking for a large unbounded export while you are only proving the connection works.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| An agent queried the wrong project | The connection is not pinned | Set **Pin to project ID** and reconnect if needed |
| Many tools show as needing approval | Expected — unannotated PostHog tools are classified as writes | Review and set the ones you want to **Allowed** |
| A read-looking tool is classified write | PostHog did not annotate it as read-only | Set it to **Allowed** deliberately if you have checked what it does |
| `exec` cannot be allowed casually | It is always classified destructive | Leave it **Off** unless you have a specific, reviewed reason |
| Write tools are missing | **Read-only mode** is on | Turn it off, or make a connection without it |
| A new PostHog tool does nothing | Newly discovered actions arrive switched off | Use **Refresh actions**, then enable it |
| Queries time out or are throttled | PostHog's own query limits, not Paperclip's | Narrow the time range or the query |

Limitations: one PostHog account per connection. Pinning restricts the project but not what the account could otherwise reach if you unpin. Query cost and rate limits are PostHog's.

## Related guides

- [Mixpanel](mixpanel.md) — another analytics connector.
- [Set action permissions](action-permissions.md)
- [How connector access works](access-model.md)
- [PostHog MCP documentation](https://posthog.com/docs/model-context-protocol)
