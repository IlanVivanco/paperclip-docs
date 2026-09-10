# Pending — nightly sync

_Regenerated from scratch each run by `/sync-docs` (nightly mode). Reflects the current cumulative manifest, not an append log._

- **Window (cumulative):** merge-base `dbf05257` → parent master `0d8bbf7c` (HEAD @ 2026-09-10T15:50Z), 352 commits, 24h quarantine applied (commits after 2026-09-09T15:50Z held).
- **Base note:** the `v2026.831.1` release tag was cut off-master, so its recorded `base_release_sha` (`65ec059`) is not reachable from master. Per the "release tag diverges from master" rule, the cumulative base is the **merge-base** (`dbf05257`), not the tag SHA.
- **Compare truncation:** two leaves remained truncated at the 300-file cap — a single 400-file feature commit (`889947c`, "add experimental native chat connectors") and a 381-file runner commit (`560e7e48`, "add SDK and developer tooling"). Both were recovered in full via the paginated commit endpoint and intersected against every watcher, so **no docs-relevant file was dropped**.
- **Scope:** exhaustive.

## Applied this run

**Nothing drafted.** Every doc-relevant change in this window is either quarantined or belongs to the already-deferred UI/onboarding refactor (see below). The auto-merge tier is empty (`.env.example` and `server/src/config.ts` are unchanged since the last run, so no new schema-bound env-var rows). Drift is all false positives. No reconciliation candidates.

## ⛔ Quarantined (held <24h — reconsider next run)

- **Native chat connectors (experimental)** — commit `889947c` (#13038), landed 2026-09-10T15:06Z, ~400 files. A large new surface: `server/src/routes/chat-channels.ts`, a `server/src/services/chat-*` layer (Slack/Discord/Teams publication, inbound wakeups, interaction arbitration), and new `ui/src/pages/apps/chat/**` connector-setup pages. **Gated** behind `ChatConnectorsExperimentalGate` / `useChatConnectorsEnabled` / instance experimental settings. Held by the 24h quarantine; also experimental, so it stays PR-tier/deferred even once it ages out. Re-evaluate next run.

## Deferred — needs a scoped release-branch follow-up (NOT drafted this run)

The parent is still mid-flight on the **streamlined-UI + onboarding refactor** first flagged last run. This window advanced it further (48 non-quarantined commits, mostly `fix(runner)`/`fix(ui)` plus a feature cluster below). It remains feature-flagged (`*.production.tsx` vs `Legacy*`) and screenshot-dependent, so per nightly policy it is held for a deliberate release-branch pass with a screenshot refresh — not piecemeal nightly drafts from master.

New this window, all part of that cluster:

- **Onboarding rework** — `feat: simplify agent onboarding and configuration` (#13011, `ebaeba4`) and `feat(onboarding): first task opens as a chat with a chief of staff` (`5acf566`). Cross-guide rewrite of `docs/guides/getting-started/*`; needs screenshots.
- **GitHub connection & repository access** — browse repo access across orgs (#12998), select multiple source repos (#13010), use the responsible person's GitHub for shared agent operations, simplified access controls (#13047), duplicate-connection resolution (#13022). Targets `docs/how-to/connect-agent-to-github.md` and the connections surface; entangled with the deferred `ConnectionSetupFlow` enrollment UI, so hold with the cluster.
- **Connections from tasks** — `feat(connections): connect services from native task feeds` (#13058) and `feat: review connection actions from tasks` (#13063). Targets `docs/experimental/connections-apps.md`; board-side approve/review flow.
- **Task board UX** — `feat(ui): add task status badges and inline blocker removal` (#13097). Targets the day-to-day / watching-agents-work guides; screenshot-dependent.

- **Screenshots** — **230 of 342 stale** across 46 routes (see `SCREENSHOTS_PENDING.md`), up from 206/39 last run. Run `npm run screenshots:refresh` in the follow-up; PNGs go to a PR for review, never auto-pushed.

## ⚠ Drift (Phase 1.5) — all triaged, no action

14 records, every one a confirmed false positive:

- **env-var `PAPERCLIP_ID_CONNECTOR_*` (high, 5)** — `BASE_URL`, `ENVIRONMENT`, `INSTANCE_ID`, `SIGN_PRIVATE_KEY`, `SEAL_PRIVATE_KEY`. **False positive** — all present in parent master (`.env.example` + `server/src/services/paperclip-cloud-connector.ts`, 12 code hits). These are the Gmail/Workspace OAuth-broker vars the last run added; **not reverted**, so no reconciliation needed.
- **env-var `PAPERCLIP_WORKSPACE_GIT_SCAN_*` (high, 4)** — `CONCURRENCY`, `QUEUE_CAPACITY`, `TIMEOUT_MS`, `CACHE_TTL_MS`. **False positive** (re-confirmed from last run) — still read in `server/src/services/workspace-git-operation-scheduler.ts`.
- **rest-route companies `import/transfers` (medium, 5)** — `POST/PUT/GET/POST/POST /api/companies/import/transfers…`. **False positive** (re-confirmed) — all registered in `server/src/routes/companies.ts` via `COMPANY_IMPORT_TRANSFERS_ROUTE_PATH`.

> Note: the `env-var-missing` class keeps re-flagging vars that live in `.env.example` under grouped/prefixed blocks the drift scanner can't match line-for-line. Candidate check-drift refinement, not a docs bug.

## ⚠ Reconcile (Phase 3.5)
- None. The env vars/routes the last run applied are all still present upstream; nothing this run drafted last run has been reverted.

## Pre-existing gaps noticed (out of scope this run)
- The `worktree` CLI command family (`worktree:make`, `worktree init`, `worktree env`, …) is not documented on any CLI page.
- `issues.md` does not document the `/issues/:id/work-products` route family or several `GET /issues/{id}` response fields/query params (unchanged this window).
