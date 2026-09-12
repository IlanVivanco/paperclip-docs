# Pending — nightly sync

_Regenerated from scratch each run by `/sync-docs` (nightly mode). Reflects the current cumulative manifest, not an append log._

- **Window (cumulative):** merge-base `dbf05257` → parent master `eb9f954b` (HEAD @ 2026-09-12T02:26Z), 425 commits, 24h quarantine applied (commits after 2026-09-11T09:53Z held).
- **Base note:** the `v2026.831.1` release tag was cut off-master, so its recorded `base_release_sha` (`65ec059`) is not reachable from master. Per the "release tag diverges from master" rule, the cumulative base is the **merge-base** (`dbf05257`), not the tag SHA.
- **Compare truncation:** two leaves remained truncated at the 300-file cap — the `889947c` feature commit ("add experimental native chat connectors") and the `560e7e4`/`51ad751` runner-SDK commits. All were recovered in full via the paginated commit endpoint and intersected against every watcher, so **no docs-relevant file was dropped**.
- **Scope:** exhaustive.

## Applied this run

**Nothing drafted.** Every doc-relevant change in this window is quarantined, belongs to the already-deferred streamlined-UI/onboarding/connections cluster, or is already documented. The auto-merge tier is empty: the `.env.example` additions in this window (`PAPERCLIP_ID_CONNECTOR_*`, `PAPERCLIP_HTTP_ADAPTER_PRIVATE_ENDPOINT_ALLOWLIST`, `PAPERCLIP_WORKSPACE_GIT_SCAN_*`) are all already present in `docs/reference/deploy/environment-variables.md` from prior runs. Drift is all false positives. No reconciliation candidates.

Absorbed `main` → `nightly` at run start (hotfix #122, "Add unlisted hosted beta guide and FAQ"). Clean merge, ancestry intact.

## ⛔ Quarantined (held <24h — reconsider next run)

Commits after 2026-09-11T09:53Z are held. Notable user-visible ones:

- **AgentMail inboxes & email tasks** — `feat(connections): add AgentMail inboxes and email tasks` (#13256, `2083bf6`, 2026-09-11T21:56Z). New connections surface; part of the connections cluster below. Held by quarantine.
- **Automatic productivity reviews removed** — `refactor: remove automatic productivity reviews` (#13263, `3bafac1`, 2026-09-11T20:46Z). A user-visible behavioural removal — revisit next run once it ages out; may need a note in the day-to-day/guides surface.
- **Operator UI snippets on Cloud** — `feat: allow operator UI snippets on Cloud instances` (#13168) and base64 snippet follow-up (#13245). Cloud-instance-only operator feature, still settling (follow-up quarantined).
- **Dashboard & task-chat UI** — dashboard card/chart refine (#13269), plus a large batch of `fix(ui)`/`feat(ui)` task-chat and runner-activity commits. Part of the deferred UI cluster; screenshot-dependent.

## Deferred — needs a scoped release-branch follow-up (NOT drafted this run)

The parent remains mid-flight on the **streamlined-UI + onboarding + connections refactor** flagged in prior runs. It stays feature-flagged (`*.production.tsx` vs `Legacy*`) and screenshot-dependent, so per nightly policy it is held for a deliberate release-branch pass with a screenshot refresh — not piecemeal nightly drafts from master.

- **Native chat connectors (experimental)** — commit `889947c` (#13038), ~400 files: `server/src/routes/chat-channels.ts`, a `server/src/services/chat-*` layer (Slack/Discord/Teams publication, inbound wakeups, interaction arbitration), and `ui/src/pages/apps/chat/**` connector-setup pages. Gated behind `ChatConnectorsExperimentalGate` / `useChatConnectorsEnabled`. **Aged out of quarantine this run**, but stays deferred: experimental, feature-gated, screenshot-dependent, and entangled with the connections cluster. Candidate home is `docs/experimental/`. Draft on the release-branch pass, not nightly.
- **Onboarding rework** — `feat: simplify agent onboarding and configuration` (#13011) and `feat(onboarding): first task opens as a chat with a chief of staff`, plus follow-ups (#13161 reuse saved model connections, #13193 Claude-paste-at-once / code-as-dots). Cross-guide rewrite of `docs/guides/getting-started/*`; needs screenshots.
- **GitHub connection & repository access** — browse repo access across orgs (#12998), multi-repo selection (#13010), shared-agent GitHub identity, simplified access controls (#13047), duplicate-connection resolution (#13022). Targets `docs/how-to/connect-agent-to-github.md`; entangled with the `ConnectionSetupFlow` enrollment UI.
- **Connections from tasks** — `feat(connections): connect services from native task feeds` (#13058), `feat: review connection actions from tasks` (#13063), plus AgentMail (#13256, quarantined). Targets `docs/experimental/connections-apps.md`; board-side approve/review flow.

- **Screenshots** — **230 of 342 stale** across 46 routes (see `SCREENSHOTS_PENDING.md`). Run `npm run screenshots:refresh` in the follow-up; PNGs go to a PR for review, never auto-pushed.

## ⚠ Drift (Phase 1.5) — all triaged, no action

14 records, every one a re-confirmed false positive (spot-checked against current master this run):

- **env-var `PAPERCLIP_WORKSPACE_GIT_SCAN_*` (high, 4)** — `CONCURRENCY`, `QUEUE_CAPACITY`, `TIMEOUT_MS`, `CACHE_TTL_MS`. Present in `.env.example` and read in `server/src/services/workspace-git-operation-scheduler.ts`.
- **env-var `PAPERCLIP_ID_CONNECTOR_*` (high, 5)** — `BASE_URL`, `ENVIRONMENT`, `INSTANCE_ID`, `SIGN_PRIVATE_KEY`, `SEAL_PRIVATE_KEY`. Present in `.env.example` + the cloud-connector service. Not reverted, so no reconciliation needed.
- **rest-route companies `import/transfers` (medium, 5)** — `POST/PUT/GET/POST/POST /api/companies/import/transfers…`. All registered in `server/src/routes/companies.ts` via `COMPANY_IMPORT_TRANSFERS_ROUTE_PATH` (confirmed at lines 766/845/908/1027/1041).

> Note: the `env-var-missing` class keeps re-flagging vars that live in `.env.example` under grouped/prefixed blocks the drift scanner can't match line-for-line. Candidate check-drift refinement, not a docs bug.

## ⚠ Reconcile (Phase 3.5)
- None. Prior runs drafted no doc edits, and nothing flagged in prior runs has been reverted upstream.

## Pre-existing gaps noticed (out of scope this run)
- The `worktree` CLI command family (`worktree:make`, `worktree init`, `worktree env`, …) is not documented on any CLI page.
- `issues.md` does not document the `/issues/:id/work-products` route family or several `GET /issues/{id}` response fields/query params (unchanged this window).
