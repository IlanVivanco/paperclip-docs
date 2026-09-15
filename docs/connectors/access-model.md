---
seo_title: How Connector Access Works
seo_description: Identity, audience, agent selection, and per-action permission are four separate decisions in a Paperclip connector. This explains what each one governs.
---

# How connector access works

Connecting a service and letting an agent use it are not the same act. A Paperclip connector separates them into four decisions, made at different moments by different people, and every tool call is checked against all four.

```txt
      credential                   who it belongs to              which agents           which actions
  ┌──────────────────┐         ┌──────────────────────┐      ┌──────────────────┐   ┌──────────────────┐
  │ the connection   │────────▶│ the grant            │─────▶│ agent access     │──▶│ action           │
  │ token or key,    │         │ personal, org, or    │      │ any agent, or    │   │ Allowed /        │
  │ server URL,      │         │ dedicated to one     │      │ just the ones    │   │ Ask first /      │
  │ transport        │         │ agent                │      │ you pick         │   │ Off              │
  └──────────────────┘         └──────────────────────┘      └──────────────────┘   └──────────────────┘
```

A call has to clear all four gates. Holding the credential is not enough; being an allowed agent is not enough.

## The connection

The connection is the stored credential plus everything needed to reach the service: the transport (`mcp_remote`, `rest_api`, `local_stdio`, `chat_sdk`, or `runtime_auth`), the server URL, and how it authenticates (`oauth`, `api_key`, or `none`).

Each connection carries a company-scoped identity — a `uid` like `google-sheets/finance-sheet-1a2b3c4d` — that survives renaming. That identity is what the rest of Paperclip references, which is why renaming a connection in the UI never breaks a policy pointed at it.

Secrets are never part of the connection record you can read back. Credential values are stored as secrets and referenced; the API returns metadata.

## The grant: who the credential belongs to

A grant answers "whose account is this?". Paperclip supports three kinds, chosen during setup under **Identity**:

| Setup choice | Grant kind | Credential policy | What it means |
| --- | --- | --- | --- |
| **Just me** | `user` | `per_user` | Your account. Agents use it only for runs where you are the responsible person. |
| **Organization identity** | `organization` | shared | One account for the company. Eligible agents use it regardless of who started the run. |
| **Dedicated agent identity** | `agent` | `per_agent` | An account that belongs to one agent and is always used by that agent, regardless of who started the run. |

Creating a personal connection is available to any active member. Creating an organization or dedicated-agent grant is a manager operation — Paperclip rejects the request with *"Only a connection manager can share this credential with the organization"* if you lack the permission, and it enforces that on the server rather than trusting the browser.

An organization grant has its own human audience, set on the connector's identity card: **Any human in the company**, or **Humans I pick** with a named member list. That audience governs which people's runs the shared credential will back.

[Use separate accounts for people and agents](separate-accounts.md) walks through choosing between them.

## Agent access: which agents may use it

Independently of the grant, each connection says which agents may use it at all. Two options, on the **Permissions** tab under **Which agents can use this connection**:

- **Any agent** — *"Available across your company."*
- **Just agents I pick** — *"Available only to selected agents."* You then choose the agents.

New connections default to `all_agents`. That is an open default, not an approval bypass: creating the connection is itself an authorized, audited operation, and every individual action still has its own permission.

For a dedicated agent identity the question narrows to *"Which agent owns this GitHub account?"* — the identity and the agent are the same decision.

## Action permission: which calls are allowed

Once connected, Paperclip reads the service's action list and gives each entry one of three states:

| State | Meaning in the UI |
| --- | --- |
| **Allowed** | *"Runs without approval."* |
| **Ask first** | *"A human must approve each call."* |
| **Off** | *"Agents cannot run this action."* |

Every discovered action is also classified by risk, which is what "set all writes to Ask first" operates on:

- **read** — no known mutation.
- **write** — creates or changes something.
- **destructive** — deletes, removes, or is otherwise not reversible. An explicit `destructiveHint` annotation from the provider forces this classification.

Classification is deliberately conservative for providers with broad, fast-moving catalogs. PostHog is the clearest example: an unannotated PostHog tool is treated as a **write**, not a read, because silently assuming "read" for an unknown tool is the failure mode worth avoiding. Its `exec` tool is hard-classified **destructive**.

Two providers have limits that no permission setting can widen:

- **Gmail** permanently blocks sending, trashing, spam-marking, and label mutation. The connector reads and searches mail and can create a draft; there is no supported path to send mail. See [Gmail](gmail.md).
- **Google Workspace** connectors are limited to the reviewed read and write tools of the capability group you connected. A tool the provider adds in preview that is not on the reviewed list is denied rather than allowed by default.

[Set action permissions](action-permissions.md) is the how-to.

## When an Ask-first call happens

An agent calling an **Ask first** action does not get an error and does not get the result. The call becomes an action request, and the agent waits.

You answer it from the **Review** tab on the connector, or the company-wide review queue, where it shows as **Waiting for your OK**. Three answers:

- **Allowed once** — the call runs this time, and nothing else changes.
- **Always allowed** — the call runs, and Paperclip creates a **trust rule** so matching calls stop asking.
- **Declined** — the call does not run.

Trust rules are visible and revocable afterwards. [Answer a connector review request](review-requests.md) covers the flow from both sides.

## The one exception worth knowing

Per-tool **Ask first** governs tool calls that go through Paperclip's tool gateway. It does not govern a shell.

When a GitHub connection is bound to an agent as a dedicated identity, that identity is also handed to the run's shell. Paperclip states this plainly at the moment you change a GitHub permission: *"Shell Git and gh use this account for the run and are not constrained by per-tool Ask-first controls."* An agent that can run `git push` or `gh pr merge` in its workspace is limited by what the GitHub account can do, not by the connector's action switches.

This is not a general sandbox claim, and it is not a claim in the other direction either. Nothing about it says other connectors are sandboxed, and human approval of a tool call is a different thing from a code review on a pull request. [GitHub](github.md) has the detail.

## Where this is enforced

Access decisions resolve at call time, not at setup time. The tool gateway holds the effective policy for an agent — the connection's own settings, plus any tool profiles and company tool policies that apply — and decides allow, ask, or deny before the request reaches the provider. Changing a permission takes effect on the next call; it does not require reconnecting.

## Related

- [Connectors](../connectors.md)
- [Share a connector with people and agents](share-access.md)
- [Set action permissions](action-permissions.md)
- [Tool Gateway](../reference/api/tool-gateway.md)
- [Trust and low-trust review](../administration/trust-and-low-trust-review.md)
