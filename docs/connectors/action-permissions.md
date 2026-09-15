---
seo_title: Set Connector Action Permissions
seo_description: Switch each connector action to Allowed, Ask first, or Off, refresh the action list when a provider changes it, and see how new actions are handled.
---

# Set action permissions

Every action a connector exposes has one of three settings, per connection. This is the gate that decides what an allowed agent can actually do.

## The three settings

| Setting | What it does |
| --- | --- |
| **Allowed** | *"Runs without approval."* |
| **Ask first** | *"A human must approve each call."* The agent waits; the call becomes a review request. |
| **Off** | *"Agents cannot run this action."* |

## Change one action

1. Open the connector and select the **Permissions** tab.
2. Use **Find an action** to filter the list.
3. Select the setting on the action's row.

Changes take effect on the next call. There is no reconnect and no restart.

The summary above the list reads back the current state — **Allowed for**, **Ask first for**, and **Off for** — so you can confirm a bulk change without scrolling the whole catalog.

## Read the risk classification

Each action carries a classification Paperclip derives from the provider's tool metadata and name:

- **read** — no known mutation.
- **write** — creates or changes something.
- **destructive** — deletes or is otherwise not reversible.

A provider annotation is authoritative. If the server marks a tool `destructiveHint`, it is destructive regardless of its name. In the other direction, name-based inference is used when the provider supplies nothing: verbs like `delete`, `remove`, `destroy`, and `unpublish` classify destructive; `create`, `update`, `write`, `send`, `publish`, `post`, `archive`, and similar classify write.

Some providers get provider-specific handling because a generic rule would be wrong:

- **PostHog** — an unannotated tool is treated as a **write**, not a read. Its `exec` tool is always **destructive**.
- **Notion** — mutations whose names do not use a create/update/delete verb (move, duplicate, convert) are enumerated explicitly as writes.
- **Shopify** — `cancel-cart`, `cancel-checkout`, and `complete-checkout` are always **destructive**.

## Refresh the action list

The action list belongs to the provider. When they add, rename, or remove a tool, your list is stale until it is re-read.

Select **Refresh actions** on the **Permissions** tab. The API equivalents are:

```http
GET  /api/tool-connections/{connectionId}/catalog
POST /api/tool-connections/{connectionId}/catalog/refresh
```

The refresh reports how many actions it discovered and how many it quarantined.

## What happens to a brand-new action

A newly discovered action does not inherit a neighbour's setting and does not arrive **Allowed**. The UI states it directly: *"New actions wait, switched off, until you turn them on."* An action you have not seen reads *"This action is new and hasn't been turned on yet."*

This is the behaviour that makes **Refresh actions** safe to run on a production connection.

## Limits you cannot lift

A permission switch cannot grant something the connector was never allowed to do.

- **Gmail** permanently blocks send, trash, spam, and label mutation. There is no setting that enables sending mail. See [Gmail](gmail.md).
- **Google Workspace** connectors allow only the reviewed reads and the write tools of the capability group you connected. A preview tool outside that list is denied.
- A connection created with a read-only capability group does not gain write actions by changing a switch; you reconnect with the write group instead.

## The shell exception

Per-action settings govern tool calls through Paperclip's tool gateway. They do not govern commands an agent runs in its own workspace shell.

When you change a permission on a GitHub connection bound to an agent identity, Paperclip says so at that moment: *"Shell Git and gh use this account for the run and are not constrained by per-tool Ask-first controls."* Read that as scoped to GitHub and to shell Git and `gh` — it is not a statement that other connectors are sandboxed.

## Related

- [How connector access works](access-model.md)
- [Answer a connector review request](review-requests.md)
- [Tool Gateway](../reference/api/tool-gateway.md)
- [Execution policy](../guides/power/execution-policy.md)
