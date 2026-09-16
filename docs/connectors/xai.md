---
seo_title: Grok Connector
seo_description: Give agents xAI Grok model access with a subscription or an API key. The Grok adapter requirement, credential assignment, a test run, and fixes.
---

# Grok

A Grok connection gives agents the credential they use to run xAI's Grok models. It is model access, not a set of tools — there are no actions to permit.

Two ways to authenticate: a subscription sign-in through the Grok CLI, or an xAI API key.

## Before you connect

- Either a subscription that covers Grok CLI sign-in, or an xAI API key from the [xAI console](https://console.x.ai/).
- An agent running on the **Grok** adapter. This is the requirement that catches people out: the credential is only usable by an agent on the Grok adapter, and the general-purpose Paperclip runner harness does not resolve to it. Set the agent's adapter to Grok rather than expecting a runner-based agent to pick this up.
- For subscription sign-in only: the `grok` CLI installed on the Paperclip server host, and terminal access to that host.

## Choose a sign-in method

| Method | Use it when | Billing |
| --- | --- | --- |
| **Subscription** | You want agent runs to draw on a plan that includes Grok CLI access | Your xAI plan's terms and limits apply |
| **API key** | You want metered usage, separate billing, or no interactive sign-in | xAI bills the key's account per token |

Do not assume the two are equivalent. The subscription path authenticates the Grok CLI; it is not a general xAI API credential. Confirm current plan entitlements with xAI rather than inferring them.

## Connect Grok

1. Open **Connectors** and select **Grok**.
2. On the **Access** step, choose whether the credential is **Personal** or **Company shared**, and which agents may use it.
3. Choose the sign-in method.

### With an API key

Paste the key. Paperclip stores it as a secret and it is not readable afterwards.

### With a subscription

Paperclip gives you a command to run in a terminal on the Paperclip server host:

1. Select **Sign in**. Paperclip shows the command, which sets `GROK_HOME` to a directory for this attempt and runs `grok login --device-auth`.
2. Run it on the server host and complete xAI's device sign-in.
3. Paperclip detects the credential and finishes the connection. The attempt stays open for 30 minutes.

> **Note:** The sign-in uses its own `GROK_HOME`, so it neither reads nor disturbs your personal `grok` login on that machine.

> **Warning:** Subscription sign-in needs terminal access to the Paperclip host, so it is unavailable on a publicly exposed authenticated deployment unless an administrator has configured a trusted runtime host. On such an instance, use an API key.

## Assign the credential

- **Set it as your default** for the provider, and agents configured to use the responsible user's connection draw on each person's own account.
- **Bind a specific connection** to the agent so every run uses that account.

**Personal** keeps the credential yours; **Company shared** makes one account available to eligible agents on any run. The model is chosen in the agent's configuration.

## Try it

```txt
Reply with the single word: ready
```

Run it on an agent whose adapter is Grok. A one-word reply confirms credential, adapter compatibility, and assignment at negligible cost. If the run reports an incompatible connection, check the adapter before anything else.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| *"Select an AI connection compatible with this harness and model"* | The agent is not on the Grok adapter — most often it is on the general runner harness, which does not resolve to Grok | Set the agent's adapter to Grok |
| *"Connect an account and choose your personal default"* | The agent uses the responsible user's connection and that person has no default | Connect an account and mark it as your default |
| A subscription connection made during the preview stops working | Preview-era subscription credentials are not reusable and must be re-established | Reconnect the account |
| **Sign in** is unavailable | Subscription sign-in is not offered on this deployment | Use an API key |
| The sign-in command does nothing | The `grok` CLI is missing on the Paperclip host, or you ran it elsewhere | Install the CLI and run the command on the server host |
| Status **expired** or **needs attention** | The credential rotated or the key was revoked | Reconnect the account |
| Runs fail with a quota error | xAI's plan or key limits, not a Paperclip limit | Check usage with xAI |

Limitations: one connection is one xAI account, and it grants no tool access. The Grok adapter requirement is narrower than the other model providers — confirm it before planning work around this connector.

## Related guides

- [Anthropic](anthropic.md), [OpenAI](openai.md), [OpenRouter](openrouter.md) — the other model providers.
- [How connector access works](access-model.md)
- [xAI documentation](https://docs.x.ai/)
