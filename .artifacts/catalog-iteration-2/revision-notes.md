# Connectors catalog — operator-first second editorial revision

PAP-18429. Local draft only. Not pushed, no PR, not published.

## What this iteration is

The second editorial pass over the connector catalog, following PAP-18407. Every connector page was rewritten against current source rather than polished. Independent critique is **paused** — this is the draft handoff, and no grades were self-awarded.

## Revision identity

| | |
| --- | --- |
| Docs branch | `PAP-18407-connectors-release-docs-local-implementation-and-review-preview-no-pr` |
| Starting point | `1fa42a74bc9a85158bb65699a82330aff002fd53` (the PAP-18407 delivered draft) |
| Base | `9f46125a8d3b7eccc900162c126888aeb85cec63` |
| Paperclip App audited | `ae0632997101070611a2efd5146b60e13a908efa` (master, 2026-09-15, tag `canary/v2026.916.0-canary.0`) |
| Previously documented snapshot | `13368c518` (2026-09-13) — superseded; page references updated |
| Inspection date | 2026-09-16 |

The overview revision and link-resolution fixes from PAP-18407 are preserved. PAP-18408 was not touched.

## Source availability, stated honestly

`paperclipai/paperclip` was read at the SHA above from a local read-only checkout. Nothing was reset or modified.

**`paperclipai/paperclip-cloud` was not available at a current revision.** The local checkout sits on a stale feature branch (`pap-15555-admin-signed-out`, 2026-08-07). Cloud-side enrollment mechanics were therefore verified only from the App side — `server/src/services/paperclip-cloud-connector.ts` and its tests — and no claim is made about Cloud's internal behaviour. This is the one material source gap in this iteration.

## Inventory reconciliation

70 app definitions in `packages/shared/src/app-definitions/` resolve as follows:

| Class | Count | Decision |
| --- | --- | --- |
| App store visible | **46** | Exactly the 46 documented provider pages |
| Recognized, withheld from Browse | 21 | No pages; already covered by `recognized-providers.md` |
| Generic templates (`api-key-generic`, `oauth-generic`) | 2 | Covered by `custom-mcp-servers.md` |
| Not connectable (`vercel`) | 1 | No page |

**No additions. No removals. No renames.** The 46 + `gmail-setup` + `github-setup` = 48-page scope is confirmed against current source.

`vercel` deserves a note: it has a complete `vercel.json` definition, so a file-count audit would read it as a new connector. It carries research status `blocked` and is absent from `CONNECTABLE_APP_SLUGS`, so it is not connectable on any instance. `recognized-providers.md` already documents it correctly as provider-gated. This is distinct from *Vercel Connect*, a credential-broker path some connectors reference.

Full per-method detail: `connector-inventory.csv` (118 rows).

## Material corrections

Consequential claims and their evidence are in `claim-evidence.csv` (32 rows). The ones that changed real content:

### 1. `requiredResourceFilters` enforces nothing

It appears only in the type declaration, the validator schema, the JSON data, and one data-consistency test. **Zero readers exist under `server/src` or `ui/src`.**

So Notion's previous promise — agents reach the pages you share "and only those" — was not backed by any Paperclip mechanism. Every scope claim across the catalog is now attributed to the control that actually applies: the provider's consent screen, the token's permissions, or the app installation. Affected: Notion, Linear, Sentry, Slack, GitHub, Supabase, ClickHouse, AgentMail, Discord, Telegram, Teams, iMessage Photon, Shopify.

The single genuine exception is the Google Sheets robot path, which really does enforce `config.allowedSpreadsheetIds` plus `assertGoogleSheetsSpreadsheetOwnership`. It is documented as the exception it is.

### 2. Managed "Connect with Paperclip" paths are enrollment-gated

`DEFAULT_OWNERSHIP_AVAILABILITY` sets `platform_shared: false`, and no app definition overrides it. `appWithPaperclipCloudConnectorAvailability` flips it true only when the instance is enrolled with Paperclip Cloud *and* the specific connector profile is enabled. 17 of 118 methods are gated this way — managed Gmail, all Google Workspace, and managed GitHub.

The gate now appears before the reader chooses a path, not after setup fails.

### 3. Gmail: the scope permits sending; the allowlist is what prevents it

`gmail.draft` requests `gmail.compose`, which does allow sending at Google. The previous page attributed the block to a two-layer mechanism including a denylist of `send|trash|spam|…`.

In current source the operative enforcement is `isGoogleWorkspaceToolAllowed`, an **allowlist** whose Gmail write set is exactly `["create_draft"]`; anything outside it is written as `disabled`. `isGmailToolPermanentlyBlocked` exists and is unit-tested but **is not called from any production path** — so describing it as a second live layer was inaccurate. The user-visible guarantee is unchanged and is stated with the correct mechanism.

The same allowlist produced verified operation lists for all nine Google connectors, including that Drive's write group is only `copy_file` and `create_file` — no delete, move, or share, which the previous Drive page overstated.

### 4. Chat connectors is off by default

All seven messaging channels (Slack chat, GitHub chat, Discord, Teams, Telegram, iMessage Photon, AgentMail) require the instance experimental setting **Chat connectors** (`enableChatConnectors`, default `false`). It was absent from every channel page and is now the first prerequisite on all of them.

### 5. AgentMail was the wrong shape

`purpose: channel` on `rest_api` transport with a fixed built-in toolset (`inboxes` / `thread` / `send` / `delivery`), not MCP tool discovery. Agents may only use inboxes assigned to them; internal comments and final responses never send email; sending does not close the task; receiving uses a maintained WebSocket so no public ingress is needed. Rewritten to the channel shape with the generic action-permissions section removed.

### Others worth naming

- **Zapier** — the generated URL embeds its bearer token. Now documented as a credential with rotation guidance; the overview no longer lists it as "No credential".
- **Slack and Asana and Linear and Box** — genuinely require a customer-registered OAuth app (no DCR). Stated as a real requirement, unlike Notion where DCR makes it an advanced alternative.
- **Telegram** — needs a public HTTPS webhook on port 443, 80, 88, or 8443, and has no sender allowlist.
- **Teams** — the RSC grants let an installed app read every message in a team or group chat without a mention; private and shared channels are unsupported in this release.
- **OpenRouter** — no subscription method; model ids must start with `openrouter/`.
- **Grok** — requires an agent on the `grok_local` adapter; the general runner harness never resolves to it.
- **Model providers** — subscription sign-in runs a provider CLI command on the Paperclip host against an isolated credential directory, with a 30-minute window, and is unavailable on a publicly exposed authenticated deployment.
- **Shopify** — public shopper-facing surface, explicitly not Admin API; 401 on private storefronts; permanent `myshopify.com` host required.
- **gmail-setup.md** — step order corrected (the UI asks **Access** before the credential), and the contradictory "reconnect to change scope" instruction removed; changing capability group requires a new connection.

## Structural and editorial changes

Removed from the operator path on every page: catalog slugs, transport enums, risk-tier codes (S1–S4), required-resource-filter rows, provider-research wave notes, ASCII authorization diagrams, internal catalog API endpoints, broker mechanics, and the editorial asides the brief named ("this is the part to get right", "the cheapest honest check", "no outbound examples in this documentation", "no other setup path is supported", "takes a couple of minutes").

Pages follow purpose-appropriate shapes rather than one template: app tools, messaging channels, model providers, and the two mixed-purpose providers, which now open with a two-choice routing table and keep their routes fully separate.

Every page ends with connector-specific troubleshooting as `Problem | Likely cause | Fix`, and every "Try it" example is a low-impact read labelled as illustrative rather than as a recorded test.

Routes and filenames are unchanged, so no redirects are required. No new pages, no nav changes, no design changes.

## Verification performed

| Check | Command | Result |
| --- | --- | --- |
| Build | `npm run docs:build` | 252 pages, clean |
| Full docs suite | `npm run docs:test` | All 8 suites pass |
| Link resolution | included above | 1837 checks pass |
| Crawlable links | included above | 69,068 internal links resolve in one hop |
| SEO contract | included above | 252 pages pass (21 descriptions rewritten to fit 158 chars) |
| Internal link lint | `npm run sync:lint-links` | 257 files, no broken links |
| Nav | `npm run sync:verify-nav` | 252 entries; 3 pre-existing orphans unrelated to connectors |

## What was NOT done — read before grading

- **No runtime testing of any connector.** No connection was created, no credential was supplied, no provider was called. Every "Try it" block is an author-validated procedure derived from current source, explicitly not a recorded test result.
- **No live external writes, sends, or deletions**, as the task required.
- **No screenshots were taken or updated.** Existing screenshot assets are untouched. Pages rely on exact UI labels read from source instead.
- **No independent critique.** Not started, not requested, not simulated. No grades assigned.
- **Cloud-side behaviour unverified** — see the source availability note above.
- **No push, PR, merge, release, deployment, or public tunnel.**

## Remaining gaps and open questions

1. **Cloud enrollment specifics.** Which profiles a given instance advertises, and how an operator requests enrollment, could not be documented from available source. Pages say the gate exists and to ask an administrator; they do not describe an enrollment process.
2. **Provider surfaces change independently.** Mixpanel, Stripe, and Shopify's UCP profile are explicitly preview or beta upstream. Statements about their tool catalogs are accurate to the audit date and will drift.
3. **Action lists are provider-supplied** for most connectors. Pages name verified representative operations and direct the reader to the live **Permissions** tab rather than freezing a list, except for Google Workspace where the reviewed allowlist is in Paperclip's own source.
4. **Three nav orphans** (`hosted-beta.md`, two CLI reference pages) predate this work and are outside connector scope.
5. **Screenshots.** Several pages would benefit from a cropped screenshot at the capability-group choice and the Access step. Deferred because no verified current UI capture was available in this run.
