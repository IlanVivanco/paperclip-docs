---
seo_title: Webflow Connector
seo_description: Let agents work with Webflow sites and CMS collections. How roles limit reach, CMS content versus publishing, a read test, and troubleshooting.
---

# Webflow

Agents can work with your Webflow sites — reading site structure and working with CMS collections and their items.

The useful case is CMS content: an agent drafting, checking, or updating collection items. Site design is not what this connector is for.

## Before you connect

- A Webflow account with access to the sites you want agents to use.
- Your workspace and site roles decide what the connection can reach. A limited role means a limited connection, which is often what you want.

## Connect Webflow

1. Open **Connectors** and select **Webflow**.
2. On the **Access** step, choose the identity and which agents may use the connection.
3. Select **Sign in with Webflow** and complete browser sign-in, authorizing the sites you want when Webflow asks.

Paperclip registers its client automatically, so there is nothing to configure in a developer console.

## Choose access

Site reach is Webflow's decision: the sites the authorizing account can access under its workspace and site roles, plus whatever you authorized. Paperclip has no site picker.

The distinction that matters most is between changing content and making it live:

| Operation | Effect |
| --- | --- |
| Reading sites, collections, and items | Nothing changes |
| Creating or updating CMS items | Changes content in Webflow |
| Publishing | Makes changes visible on the live site |

> **Warning:** Publishing is the consequential one. A publish can push every pending change on a site live, not only the item an agent was working on — including edits colleagues had staged and not yet finished. Keep publish actions **Off** and let a person publish from Webflow.

Design capabilities — layouts, styles, components, interactions — are not what this connection is for. Do not plan on an agent restyling a site through it. See [Set action permissions](action-permissions.md).

## Try it

```txt
List the CMS collections on the marketing site and tell me how many items are in the blog collection. Do not create, change, or publish anything.
```

Compare against the Webflow dashboard. Reading collection structure confirms the credential and the site scope without touching content or the live site.

> **Note:** Illustrative task, not a recorded test result. Substitute a site and collection from your own account.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| A site is missing | The account's workspace or site role does not include it, or it was not authorized | Adjust the role in Webflow, or reconnect and authorize it |
| A CMS field is missing | Certain field types are not exposed, or the field is on a different collection | Check the collection schema in Webflow |
| A change is not visible on the live site | CMS changes require publishing | Publish from Webflow when the change is ready |
| A site published unexpectedly | A publish action was set to **Allowed** | Set it to **Off**; review what went live in Webflow |
| An agent cannot change the layout | Expected — design capabilities are not exposed | Make design changes in the Webflow Designer |
| **Needs attention** | The grant was revoked | Select **Reconnect** |

Limitations: one Webflow account per connection. No site filter inside Paperclip. CMS and site data rather than design. Webflow's plan limits apply to CMS item counts and API rates.

## Related guides

- [Wix](wix.md) — another website platform connector.
- [Set action permissions](action-permissions.md)
- [How connector access works](access-model.md)
- [Webflow MCP getting started](https://developers.webflow.com/mcp/reference/getting-started)
