---
seo_title: ClickHouse Connector
seo_description: Let agents query a ClickHouse Cloud ClickStack service. Finding the service ID, why self-hosted is not supported, bounded query testing, and troubleshooting.
---

# ClickHouse

Agents can query a ClickHouse Cloud ClickStack service — useful for letting an agent answer questions from observability or analytics data.

> **Warning:** This is ClickHouse Cloud's managed ClickStack server. A self-hosted or self-managed ClickHouse cluster is not reachable through this connector. If you run your own ClickHouse, [connect your own MCP server](custom-mcp-servers.md) instead.

## Before you connect

- A ClickHouse Cloud account with a ClickStack service.
- The **ClickHouse Cloud service ID** for that service. Copy it from **ClickStack → Team Settings → API & Agents**. It looks like `11e1031f-9a13-4cac-9bc7-d4ec9286ec17`.
- Database grants on the account you sign in with. What an agent can query is decided by ClickHouse's own users and grants, so decide those before connecting rather than after.

## Connect ClickHouse

1. Open **Connectors** and select **ClickHouse**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Select **Sign in with ClickHouse** and complete browser sign-in.
4. Enter the **ClickHouse Cloud service ID**.
5. Finish setup.

## Choose access

The real control is on the ClickHouse side. Reach is whatever the signed-in account's database users and grants permit — Paperclip does not add a table or database filter on top.

If an agent should only read, grant only read. A read-only ClickHouse user is a stronger and clearer boundary than relying on action settings alone, and it survives changes to the tool catalog.

> **Warning:** ClickHouse queries can be expensive. A poorly bounded query over a large table costs real compute and can affect the service for everyone using it. Keep agent queries bounded, and prefer a service or user with sensible quotas.

Any schema-changing or data-changing operations should stay **Off** unless you have a specific reason. See [Set action permissions](action-permissions.md).

## Try it

Run something deliberately cheap and bounded:

```txt
List the tables in the ClickHouse service, then tell me the row count of the smallest one. Do not run any query without a limit, and do not change anything.
```

Expect a table list matching what you see in ClickStack. Asking for structure first, and only then a narrow count, keeps the verification inexpensive.

Do not verify with a full scan of a production table, and do not verify with DDL.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Setup will not complete | The service ID is missing or malformed | Copy it from **ClickStack → Team Settings → API & Agents** |
| You cannot find a service ID | The account has no ClickStack service, or it is self-hosted | ClickStack on ClickHouse Cloud is required |
| Authorization succeeds but no tables appear | The signed-in user has no grants on any database | Grant access to the user in ClickHouse |
| Some tables are missing | Grants cover only some databases | Adjust the grants; no reconnect needed |
| A query is refused | The user is read-only and the query writes | Expected if you configured it that way |
| A query is slow or expensive | It was unbounded over a large table | Add limits, and set quotas on the ClickHouse user |
| **Needs attention** | The sign-in expired or the service was removed | Select **Reconnect** and confirm the service still exists |

Limitations: one ClickStack service per connection. ClickHouse Cloud only. Access control is ClickHouse's grants, not a Paperclip resource filter.

## Related guides

- [Supabase](supabase.md) — another database connector.
- [Connect your own MCP server](custom-mcp-servers.md) — for self-hosted ClickHouse.
- [Set action permissions](action-permissions.md)
- [ClickHouse managed ClickStack MCP server](https://clickhouse.com/blog/announcing-managed-clickstack-mcp-server)
