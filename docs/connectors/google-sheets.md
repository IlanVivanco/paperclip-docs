---
seo_title: Google Sheets Connector
seo_description: Two ways to connect Google Sheets — a Google sign-in, or sharing named spreadsheets with the Paperclip robot account. Capability groups, a read test, and troubleshooting.
---

# Google Sheets

Agents can read spreadsheet values and structure, and on a writing connection update them.

Sheets is the one connector with two genuinely different setups: sign in with Google, or share named spreadsheets with a Paperclip robot account. They differ in what agents can reach and what they can do, so choose before you start.

## Which setup do you want?

| If you want | Use | Reach |
| --- | --- | --- |
| Agents to work across the spreadsheets your Google account can already open | **Google sign-in** | Everything that account can open |
| Agents limited to a short, explicit list of spreadsheets | **The Paperclip robot account** | Only the spreadsheets you paste in |

The robot account is the stronger boundary, and the only connector where Paperclip itself enforces which resources are reachable. It also exposes a wider set of operations, including row deletion. The Google sign-in path reaches more spreadsheets but cannot delete anything.

## Option A: Google sign-in

> **Warning:** This path needs Google Workspace Developer Preview registration before it will authorize. Google must register the Workspace email that signs in, and the Cloud project that owns the OAuth client if you bring your own. Apply first at [Google Workspace Developer Preview](https://developers.google.com/workspace/preview).

### Before you connect

- A Google Workspace account that can already open the spreadsheets you want agents to use, with Developer Preview registration confirmed.
- Without Paperclip Cloud enrollment, your own Google OAuth client with the Drive, Sheets, and Sheets MCP APIs enabled and Paperclip's callback URI registered.

### Capability groups

| Group | What agents can do | Scopes requested |
| --- | --- | --- |
| **Read only** | Read spreadsheet values and structure | `drive.readonly`, `spreadsheets.readonly` |
| **Read & edit** | The above, plus update values, formulas, and dimensions | `drive.readonly`, `drive.file`, `spreadsheets` |

Reviewed operations: `get-spreadsheet` and `get-values` in both groups; `update-spreadsheet`, `update-values`, `update-formulas`, and `insert-dimension` in the editing group only. There is no delete operation on this path.

### Steps

1. Open **Connectors** and select **Google Sheets**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Choose the capability group, then **Connect with Paperclip** or **Use your own Google OAuth app**.
4. Complete Google's consent screen with the registered Workspace account.

> **Note:** The connector's guidance is that spreadsheet updates should be approved. Leave the write operations on **Ask first**.

## Option B: the Paperclip robot account

Instead of connecting a Google identity, you share individual spreadsheets with a robot account that the instance owns. Agents then reach exactly those spreadsheets and nothing else.

This path requires the instance administrator to have configured a service account. If they have not, Paperclip reports *"Google Sheets is not available on this instance yet."* and the option cannot be used. It needs no Developer Preview registration.

### Steps

1. Open **Connectors** and select **Google Sheets**, then choose **Use the Paperclip robot account**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Paperclip shows the robot account's email address. In Google Sheets, share each spreadsheet with that address:
   - **Viewer** is enough for reading.
   - **Editor** is required for appending, updating, adding tabs, clearing values, or deleting rows.
4. Paste the link to each shared spreadsheet. At least one link is required, and Paperclip rejects anything that is not a Google Sheets link.
5. Finish setup. Paperclip verifies it can reach each spreadsheet you listed.

### What agents can do on this path

| Operation | Class |
| --- | --- |
| `list_spreadsheets`, `get_spreadsheet_info`, `read_values`, `search_rows` | read |
| `append_rows`, `update_values`, `add_sheet_tab` | write |
| `clear_values`, `delete_rows` | destructive |

Every one of these is restricted to the spreadsheets on the connection's list. Adding a spreadsheet later means editing the connection's list — sharing it with the robot account alone is not enough.

> **Warning:** `clear_values` and `delete_rows` remove data and are not reversible from Paperclip. Leave them **Off** unless an agent genuinely needs them, and rely on Google Sheets version history for recovery.

## Choose access

On the Google sign-in path, reach is whatever the authorizing account can open, and Paperclip does not narrow it. On the robot path, reach is the pasted list and Paperclip does enforce it.

Either way, the identity that owns the credential and the **Any agent** / **Just agents I pick** choice work as they do for any connector. See [How connector access works](access-model.md).

## Try it

```txt
Read the "Headcount" tab of the hiring plan spreadsheet and tell me the column headers and how many rows have data. Do not change anything.
```

Compare against the spreadsheet. On the robot path, `list_spreadsheets` is an even smaller first check: it returns the connection's allowlist, which confirms setup without touching cell data.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| **Use the Paperclip robot account** is unavailable | No service account is configured on the instance | Ask an administrator; the message is *"Google Sheets is not available on this instance yet."* |
| A pasted link is rejected | It is not a Google Sheets link | Use the spreadsheet's own URL, not a Drive folder or a published-to-web link |
| Robot path: the agent cannot see a spreadsheet you shared | It is not on the connection's list | Add the link to the connection; sharing alone does not grant reach |
| Robot path: reads work but writes fail | The robot account has **Viewer**, not **Editor** | Change the sharing role in Google Sheets |
| Google sign-in: authorization refused before consent | Developer Preview registration is incomplete | Finish registration and retry |
| Google sign-in: writes are absent | The connection was made with **Read only** | Make a connection with **Read & edit** |
| **Needs attention** | The credential expired or the grant was revoked | Select **Reconnect** |

Limitations: neither path creates or deletes whole spreadsheets. The Google sign-in path has no delete operation at all. Developer Preview applies to the Google sign-in path only.

## Related guides

- [Google Drive](google-drive.md) — find and create files.
- [How connector access works](access-model.md)
- [Verify a connector and fix a broken one](verify-and-troubleshoot.md)
- [Google Sheets API MCP reference](https://developers.google.com/workspace/sheets/api/reference/mcp)
