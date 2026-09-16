---
seo_title: Anthropic Connector
seo_description: Give agents Claude model access with a Claude subscription or an Anthropic API key. Runtime requirements, assigning the credential, a bounded test run, and troubleshooting.
---

# Anthropic

An Anthropic connection gives agents the credential they use to run Claude models. It is model access, not a set of tools — there are no actions to permit and nothing appears on a **Permissions** tab.

Two ways to authenticate: a Claude subscription, or an Anthropic API key.

## Before you connect

- Either a Claude subscription, or an Anthropic API key from the [Anthropic console](https://console.anthropic.com/settings/keys).
- An agent that runs on the Claude runtime. This credential is only usable by an agent whose harness resolves to Claude; a Codex or OpenCode agent cannot use it. Check the agent's runtime before connecting.
- For subscription sign-in only: the `claude` CLI installed on the Paperclip server host, and terminal access to that host.

## Choose a sign-in method

| Method | Use it when | Billing |
| --- | --- | --- |
| **Subscription** | You already pay for a Claude plan and want agent runs to draw on it | Your Claude plan's usage limits apply |
| **API key** | You want metered usage, separate billing, or no interactive sign-in | Anthropic bills the key's organization per token |

Subscription plans carry their own usage limits, and those limits are Anthropic's, not Paperclip's. Check current plan terms with Anthropic rather than assuming a rate.

## Connect Anthropic

1. Open **Connectors** and select **Anthropic**.
2. On the **Access** step, choose whether the credential is **Personal** or **Company shared**, and which agents may use it.
3. Choose the sign-in method.

### With an API key

Paste the key. Paperclip stores it as a secret and it is not readable afterwards.

### With a Claude subscription

Paperclip does not ask for your Claude password. Instead it gives you a one-line command to run in a terminal on the Paperclip server host, which signs in against an isolated credential directory belonging to this connection:

1. Select **Sign in**. Paperclip shows the command, which sets `CLAUDE_CONFIG_DIR` to a directory for this attempt and then runs `claude auth login`.
2. Run it on the server host and complete Anthropic's sign-in.
3. Paperclip detects the credential and finishes the connection. The attempt stays open for 30 minutes.

> **Note:** The sign-in uses its own credential directory, so it neither reads nor disturbs your personal `claude` CLI login on that machine.

> **Warning:** Subscription sign-in needs terminal access to the Paperclip host, so it is unavailable on a publicly exposed authenticated deployment unless an administrator has configured a trusted runtime host. On such an instance, use an API key.

## Assign the credential

A connected account is not yet the account a run uses. Two ways to bind it:

- **Set it as your default** for the provider. Agents configured to use the responsible user's connection then pick up whichever account that person has made their default, so each person's runs draw on their own credential.
- **Bind a specific connection** to the agent, so every run uses that account regardless of who started the work.

A **Personal** connection stays yours; **Company shared** makes one account available to eligible agents on any run. The model itself is chosen in the agent's configuration, not here.

## Try it

Give the agent a short, cheap task and confirm the run completes:

```txt
Reply with the single word: ready
```

A successful one-word reply proves the whole path — credential, runtime compatibility, and assignment — for a negligible amount of usage. Watch the run rather than a status badge: a connection can show as connected and still fail at run time if the agent's runtime does not match.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| *"Select an AI connection compatible with this harness and model"* | The agent does not run on the Claude runtime, or the selected model does not match the connection | Move the agent to a Claude runtime, or use that runtime's own provider |
| *"Connect an account and choose your personal default"* | The agent uses the responsible user's connection and that person has no default for this provider | Connect an account and mark it as your default |
| *"This run needs a responsible user to select an AI connection"* | The run has no responsible person, so there is no personal default to read | Bind a specific connection to the agent instead |
| **Sign in** is unavailable | Subscription sign-in is not offered on this deployment | Use an API key |
| The sign-in command does nothing | The `claude` CLI is not installed on the Paperclip host, or you ran it elsewhere | Install the CLI and run the command on the server host |
| *"Another sign-in is still open"* | A previous attempt has not expired | Finish or wait out the open attempt, then retry |
| Status **expired** or **needs attention** | A subscription credential rotated, or the API key was revoked | Reconnect the account |
| Runs fail with a provider quota error | Anthropic's plan or key limits, not a Paperclip limit | Check usage with Anthropic |

Limitations: one connection is one provider account. This connector grants no tool access of any kind. Model choice and the agent's runtime are configured on the agent, not on the connection.

## Related guides

- [OpenAI](openai.md), [OpenRouter](openrouter.md), [Grok](xai.md) — the other model providers.
- [How connector access works](access-model.md)
- [Anthropic API documentation](https://docs.anthropic.com/)
