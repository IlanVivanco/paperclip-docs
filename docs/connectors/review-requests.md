---
seo_title: Answer a Connector Review
seo_description: An agent hit an Ask-first action and is waiting. Approve it once, approve it permanently with a trust rule, or decline, and see what each choice does.
---

# Answer a connector review request

When an agent calls an action set to **Ask first**, the call stops and waits for a person. This is where you answer it.

## Find the waiting requests

Two places, same queue:

- **Connectors → Review**, for everything across the company.
- A connector's own **Review** tab, scoped to that one connection.

Pending items are labelled **Waiting for your OK**. The connector list flags the connection as **Needs attention** while something is pending.

The API equivalent is:

```http
GET /api/companies/{companyId}/tools/action-requests?status=pending
```

## What a request shows you

Each card names the action, the agent that called it, and the connection it would run against. **Show raw response** and the request arguments are there so you can read the actual call rather than a paraphrase of it.

Read the arguments before approving. The permission you set was on the action; the request in front of you is one concrete invocation of it.

## The three answers

| Answer | What happens |
| --- | --- |
| **Allowed once** | The call runs this time. *"…can run this time."* Nothing else changes; the next identical call asks again. |
| **Always allowed** | The call runs, and Paperclip creates a **trust rule** so matching calls stop asking. |
| **Declined** | The call does not run. *"…won't run."* The agent receives the refusal and continues. |

The underlying routes are `POST /api/tool-gateway/action-requests/{id}/approve` and `POST /api/tool-gateway/action-requests/{id}/decline`. **Always allowed** additionally calls `POST /api/companies/{companyId}/tools/action-requests/{actionRequestId}/trust-rule`.

## Trust rules

A trust rule is a stored company tool policy created from one approval. It is not invisible: rules are listed under the company's tool policies with the selectors they match, and each one can be revoked.

Revoking a trust rule sends matching calls back to **Ask first**. It does not undo calls that already ran.

Prefer **Allowed once** the first few times you see an action. Promote to **Always allowed** when you have seen enough invocations to know what the arguments look like in practice.

## What the agent experiences

An agent calling an Ask-first action does not get an error and does not get a result — it gets told approval is required, and it waits. Paperclip wakes the agent again when you answer.

Approval means approve and run: Paperclip executes the stored call arguments exactly once. An agent should not re-issue the call after an approval; if the wake says it executed, that result is the result.

A declined request means the action did not happen. The agent is expected to change approach rather than retry the same call.

Pending requests expire. After expiry the item reads **Expired — send it again**, and the agent has to make a fresh call to open a new request.

## If a request seems stuck

- **Denied — see Review for why** on a test call means the request was declined, not that the connector is broken.
- A request that never appears usually means the call never reached the gateway. Check the action is not **Off**, and that the agent is in the connection's allowed set.
- A connection in **Paused** state does not produce review requests, because agents cannot use it at all.

## Related

- [Set action permissions](action-permissions.md)
- [How connector access works](access-model.md)
- [Approvals](../guides/day-to-day/approvals.md)
- [Blocked inbox](../guides/day-to-day/blocked-inbox.md)
