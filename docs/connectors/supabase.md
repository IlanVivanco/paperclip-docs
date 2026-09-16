---
seo_title: Supabase Connector
seo_description: Let agents work with a Supabase project. Scope it to a development project, use read-only mode, and understand the production risk before connecting.
---

# Supabase

Agents can inspect and work with a Supabase project — its database, schema, and project configuration.

> **Warning:** Use a development project. Supabase connections can reach real data and, without read-only mode, change schema and database contents. Do not connect a production project unless you have read Supabase's own MCP security guidance and accepted the risk deliberately.

Write tools start enabled on this connector. They are governed by Paperclip's action settings, but the default is not read-only — you have to choose that.

## Before you connect

- A Supabase account with access to the project you want agents to use.
- The **project reference** of that project, from its Supabase settings.
- A decision about read-only mode, made before you connect rather than after.

## Connect Supabase

1. Open **Connectors** and select **Supabase**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose how to authenticate:
   - **Sign in with Supabase** — browser sign-in.
   - **Use an API key** — paste a Supabase API key.
4. Set the scoping controls below.
5. Finish setup.

## Scope the connection

| Control | Recommendation |
| --- | --- |
| **Project reference** | Always set it. Scope the connection to one development project |
| **Read-only mode** | Turn it on unless an agent genuinely needs to change the database |
| **Feature groups** | Optionally narrow which groups of tools are exposed |

Setting the project reference is the difference between "this agent works on one development project" and "this agent can reach what the account can reach". Set it.

Read-only mode is the other decision worth making up front. Turning it on after an agent has already had write tools does not undo anything it did.

## Choose access

Project reach is the Supabase account's, narrowed by the project reference you set. Organization and project permissions are Supabase's, not Paperclip's — an account with owner rights on an organization brings those rights to the connection.

Be clear about the range of what write access means here. It is not only inserting rows: depending on the tools exposed, it can include schema changes and project configuration. Those are not reversible from Paperclip.

Leave writes on **Ask first** at minimum, and prefer **Off** for anything touching schema. See [Set action permissions](action-permissions.md).

## Try it

Use a metadata read, not a query against real data:

```txt
List the tables in the Supabase project and tell me how many there are. Do not query any row data or change anything.
```

Expect a table list matching the project. A metadata read confirms the credential and the project scope without pulling customer data into a task transcript, and without running anything expensive.

Do not verify with a migration, a schema change, or a privileged SQL statement.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| The agent reached an unexpected project | No project reference was set | Set **Project reference** and reconnect |
| Write tools are missing | **Read-only mode** is on | That is the recommended posture; turn it off only deliberately |
| A schema change succeeded that you did not expect | Write tools start enabled and the action was allowed | Turn on read-only mode, or set schema tools to **Off**; recover using Supabase's own backups |
| Authentication succeeds but the project is not visible | The account lacks access to that project | Grant access in Supabase |
| Queries fail or time out | Supabase project limits, not Paperclip | Check the project's plan and resource limits |
| **Needs attention** | The key was revoked or the sign-in expired | Select **Reconnect** |

Limitations: one project per connection when scoped. Paperclip cannot roll back a database change — recovery is Supabase's backups. Read-only mode hides write tools but is not a substitute for using a development project.

## Related guides

- [ClickHouse](clickhouse.md) — another database connector.
- [Set action permissions](action-permissions.md)
- [How connector access works](access-model.md)
- [Supabase MCP documentation](https://supabase.com/docs/guides/ai-tools/mcp)
