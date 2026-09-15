---
seo_title: Shopify Connector
seo_description: Search a store's products and policies, and manage shopping carts. Set it up in Paperclip with no sign-in, then choose which agents and actions are allowed.
---

# Shopify

Search a store's products and policies, and manage shopping carts.

## What this connector does

Shopify is an **agent tool** connector. Once it is connected, the provider's MCP server supplies the action list, and Paperclip governs which agents may call which actions.

| | |
| --- | --- |
| Catalog slug | `shopify` |
| Category | Commerce and finance |
| Transport | `mcp_remote` |
| Highest risk tier | S3 — account data that can be changed. |

## Before you start

- **Launch the storefront before connecting.** Shopify's Storefront MCP is a public, no-auth endpoint. Paperclip cannot use the merchant's Shopify Admin session to bypass a private storefront. See [Open Shopify Admin](https://admin.shopify.com/).
- This is Shopify's shopper-facing UCP server, not Admin API access. It does not manage merchant products or customers.
- The storefront must be public. A private or password-protected storefront returns HTTP 401 even when the merchant is signed in to Shopify Admin.
- Paperclip currently uses Shopify's documented hosted agent-profile fixture while Paperclip's production UCP profile is being established.
- This is Shopify's Storefront MCP, not Admin API access. It does not manage merchant products, orders, or customers.

## Supported setup paths

Open **Connectors**, find **Shopify**, and select **Connect**. Paperclip offers exactly the paths below; no other setup path is supported.

### Shopify UCP commerce (`ucp-commerce`)

Recommended for Shopify's current UCP catalog, cart, and checkout tools.

- Sign-in style: No sign-in
- OAuth client: your own client or key
- Risk tier: S3
- Endpoints: MCP server `https://{storeDomain}/api/ucp/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **Store domain** | Yes | Enter the permanent myshopify.com domain without https://. Custom storefront domains are not the MCP endpoint. |

Provider console: [provider docs](https://shopify.dev/docs/agents/catalog/storefront-catalog)

### Storefront policies and compatibility tools (`storefront-mcp`)

Use Shopify's compatibility server when agents need storefront policy and FAQ search.

- Sign-in style: No sign-in
- OAuth client: your own client or key
- Risk tier: S3
- Endpoints: MCP server `https://{storeDomain}/api/mcp`

| Field | Required | What it is |
| --- | --- | --- |
| **Store domain** | Yes | Enter the permanent myshopify.com domain without https://. Custom storefront domains are not the MCP endpoint. |

Provider console: [provider docs](https://shopify.dev/docs/apps/build/storefront-mcp/servers/storefront)

## Accounts and access

Shopify follows the standard connector access model. At setup you choose the identity — **Just me**, an **Organization identity**, or a **Dedicated agent identity** — and then which agents may use it: **Any agent** or **Just agents I pick**. [How connector access works](access-model.md) explains what each choice means; [Share a connector with people and agents](share-access.md) is the step-by-step.

## Actions

Shopify's action list comes from the provider's MCP server, so it changes when the provider changes it. Paperclip does not ship a frozen copy. To read the current list for your connection, open the connector and use the **Permissions** tab; **Refresh actions** re-reads the server. The equivalent API calls are `GET /api/tool-connections/{connectionId}/catalog` and `POST /api/tool-connections/{connectionId}/catalog/refresh`.

Every discovered action is classified **read**, **write**, or **destructive**, and each one can be set to **Allowed**, **Ask first**, or **Off** per connection. See [Set action permissions](action-permissions.md).

## Authorization sequence

There is no browser handshake. Paperclip stores the value you supply as a secret and presents it to the server on each call; the connection is created by `POST /api/companies/{companyId}/tools/apps/connect` and completed by `POST /api/companies/{companyId}/tools/apps/{connectionId}/finish`.

## Check that it works

Use a read-only action first. [Verify a connector and fix a broken one](verify-and-troubleshoot.md) has the full procedure, including the built-in test call and what each status word in the connector list means.

## If something goes wrong

| What you see | What it means |
| --- | --- |
| **Setup incomplete** | The connection record exists but setup never finished. Select **Finish setup**. |
| **Needs attention** | The credential stopped working. Select **Reconnect** and sign in again. |
| **Paused** | Agents cannot use the connection right now. |
| The provider rejects the sign-in | Confirm the prerequisite above is done: launch the storefront before connecting. |

[Verify a connector and fix a broken one](verify-and-troubleshoot.md) covers the rest.

## Related

- [Connectors](../connectors.md)
- [How connector access works](access-model.md)
- [Set action permissions](action-permissions.md)
- [Reauthorize, revoke, or disconnect](reauthorize-and-disconnect.md)
- [Shopify provider documentation](https://shopify.dev/docs/apps/build/storefront-mcp/servers/storefront)
