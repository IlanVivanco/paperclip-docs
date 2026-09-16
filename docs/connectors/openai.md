---
seo_title: OpenAI Connector
seo_description: Give agents OpenAI model access with a Codex subscription sign-in or an API key. Runtime requirements, assignment, a test run, and fixes.
---

# OpenAI

An OpenAI connection gives agents the credential they use to run OpenAI models. It is model access, not a set of tools — there are no actions to permit.

Two ways to authenticate: a subscription sign-in through the Codex CLI, or an OpenAI API key.

## Before you connect

- Either a plan that covers Codex CLI sign-in, or an OpenAI API key from the [OpenAI dashboard](https://platform.openai.com/api-keys).
- An agent that runs on the Codex runtime. This credential is only usable by an agent whose harness resolves to Codex; a Claude or OpenCode agent cannot use it.
- For subscription sign-in only: the `codex` CLI installed on the Paperclip server host, and terminal access to that host.

## Choose a sign-in method

| Method | Use it when | Billing |
| --- | --- | --- |
| **Subscription** | You want agent runs to draw on a plan that includes Codex | Your OpenAI plan's terms and limits apply |
| **API key** | You want metered usage, separate billing, or no interactive sign-in | OpenAI bills the key's organization per token |

> **Warning:** These are not interchangeable. The subscription path authenticates the Codex CLI, so it covers Codex-runtime agent runs — it is not a general-purpose OpenAI API credential for other integrations. If you need arbitrary OpenAI API access, use an API key.

Confirm current plan entitlements and limits with OpenAI rather than assuming; they change independently of Paperclip.

## Connect OpenAI

1. Open **Connectors** and select **OpenAI**.
2. On the **Access** step, choose whether the credential is **Personal** or **Company shared**, and which agents may use it.
3. Choose the sign-in method.

### With an API key

Paste the key. Paperclip stores it as a secret and it is not readable afterwards.

### With a subscription

Paperclip gives you a command to run in a terminal on the Paperclip server host. It signs in against a credential directory belonging to this connection:

1. Select **Sign in**. Paperclip shows the command, which sets `CODEX_HOME` to a directory for this attempt and runs `codex login --device-auth` with file-based credential storage.
2. Run it on the server host and complete OpenAI's device sign-in.
3. Paperclip detects the credential and finishes the connection. The attempt stays open for 30 minutes.

> **Note:** The sign-in uses its own `CODEX_HOME`, so it neither reads nor disturbs your personal `codex` login on that machine.

> **Warning:** Subscription sign-in needs terminal access to the Paperclip host, so it is unavailable on a publicly exposed authenticated deployment unless an administrator has configured a trusted runtime host. On such an instance, use an API key.

## Assign the credential

- **Set it as your default** for the provider, and agents configured to use the responsible user's connection will draw on each person's own account.
- **Bind a specific connection** to the agent so every run uses that account regardless of who started the work.

**Personal** keeps the credential yours; **Company shared** makes one account available to eligible agents on any run. The model is chosen in the agent's configuration, not here.

## Try it

```txt
Reply with the single word: ready
```

A successful one-word reply confirms credential, runtime compatibility, and assignment together at negligible cost. Watch the run itself — a connection can look healthy and still fail at run time if the agent is not on a Codex runtime.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| *"Select an AI connection compatible with this harness and model"* | The agent does not run on the Codex runtime | Move the agent to a Codex runtime, or use that runtime's provider |
| *"Connect an account and choose your personal default"* | The agent uses the responsible user's connection and that person has no default | Connect an account and mark it as your default |
| *"This run needs a responsible user to select an AI connection"* | The run has no responsible person | Bind a specific connection to the agent instead |
| A subscription connection made during the preview stops working | Preview-era subscription credentials are not reusable and must be re-established | Reconnect the account |
| **Sign in** is unavailable | Subscription sign-in is not offered on this deployment | Use an API key |
| The sign-in command does nothing | The `codex` CLI is missing on the Paperclip host, or you ran it elsewhere | Install the CLI and run the command on the server host |
| Status **expired** or **needs attention** | The credential rotated or the key was revoked | Reconnect the account |
| Runs fail with a quota error | OpenAI's plan or key limits, not a Paperclip limit | Check usage with OpenAI |

Limitations: one connection is one provider account, and it grants no tool access. The subscription path is tied to the Codex CLI rather than being a general OpenAI API credential.

## Related guides

- [Anthropic](anthropic.md), [OpenRouter](openrouter.md), [Grok](xai.md) — the other model providers.
- [How connector access works](access-model.md)
- [OpenAI platform documentation](https://platform.openai.com/docs)
