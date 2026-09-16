---
seo_title: Box Connector
seo_description: Let agents search and read Box content. The Box administrator work required first, enterprise restrictions, a read test, and why content can be missing after a clean setup.
---

# Box

Agents can search and work with files and folders in Box.

> **Warning:** This connector needs Box administrator work before anyone can connect. An administrator creates the OAuth integration in Box and enables AI access for the enterprise. Without both, authorization either fails or succeeds into an empty account.

## Before you connect

- A Box administrator who will create the OAuth integration and enable AI access for the enterprise. If that is not you, start by asking them — no amount of work in Paperclip substitutes for it.
- The client ID and secret from that Box integration, and Paperclip's callback URI registered on it. Paperclip shows the URI during setup.
- A Box account with access to the content you want agents to use.

Box does not support automatic client registration for this server, so your own OAuth integration is required rather than optional.

## Connect Box

1. Have a Box administrator create the OAuth integration, register Paperclip's callback URI, and enable AI access for the enterprise.
2. Open **Connectors** and select **Box**.
3. On the **Access** step, choose the identity and which agents may use the connection.
4. Select **Use your own OAuth app**, supply the client ID and secret, then authorize in Box.

## Choose access

Reach is the authorizing Box account's: the files, folders, and shared content that account can already open. Paperclip has no folder picker, so narrow access by authorizing with an account that has access to less.

Box enterprises often apply further restrictions on top — classification labels, shared-link policies, and app-access rules can all keep content out of an integration even when the user can see it in the Box web app. This is the usual reason an agent finds nothing after an apparently clean setup.

File writes and deletions are consequential and not always recoverable from Paperclip. Leave them on **Ask first** or **Off**, and rely on Box's trash and version history for recovery. See [Set action permissions](action-permissions.md).

## Try it

```txt
Search Box for a file named "supplier agreement" and tell me its folder and last modified date. Do not download, move, or change anything.
```

Compare against Box. A metadata read confirms the credential and the enterprise's AI access without pulling document contents into a task transcript.

> **Note:** Illustrative task, not a recorded test result. Substitute a filename you can find yourself.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Authorization fails | The Box OAuth integration does not exist, or the callback URI does not match | Have an administrator create it and register the exact URI |
| Authorization succeeds but nothing is found | AI access is not enabled for the enterprise, or an enterprise policy blocks the app | Ask a Box administrator to enable AI access and check app-access rules |
| Some folders are visible and others are not | The authorizing account is not a collaborator on them, or classification rules apply | Add the account as a collaborator, or check the classification policy |
| A file cannot be read despite being listed | Enterprise restrictions on that content, or an unsupported file type | Check the file's classification in Box |
| A delete or move happened unexpectedly | A write action was set to **Allowed** | Restore from Box trash, then tighten the action settings |
| **Needs attention** | The grant was revoked, or the integration was disabled | Select **Reconnect**; check the integration still exists |

Limitations: one Box account per connection. No folder restriction inside Paperclip. Enterprise policy can override what the account appears to have.

## Related guides

- [Google Drive](google-drive.md) — another file storage connector.
- [Set action permissions](action-permissions.md)
- [How connector access works](access-model.md)
- [Managing Box MCP servers](https://support.box.com/hc/en-us/articles/43847256139923-Managing-Box-MCP-Servers)
