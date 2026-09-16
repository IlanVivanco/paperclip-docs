---
seo_title: OpenRouter Connector
seo_description: Give agents model access through OpenRouter with an API key. Runtime and model-prefix requirements, assigning the credential, a bounded test, and troubleshooting.
---

# OpenRouter

An OpenRouter connection gives agents a credential that routes to many model providers through one account. It is model access, not a set of tools — there are no actions to permit.

OpenRouter is API key only. There is no subscription sign-in for this provider, and Paperclip says so on the sign-in screen.

## Before you connect

- An OpenRouter account with credit or billing set up, and an API key from [OpenRouter keys](https://openrouter.ai/keys).
- An agent that runs on the OpenCode runtime. This credential is only usable by an agent whose harness resolves to OpenCode.
- A model id that starts with `openrouter/`. This is a hard requirement, not a convention — Paperclip treats an OpenRouter connection as incompatible with a model id that lacks the prefix.

## Connect OpenRouter

1. Open **Connectors** and select **OpenRouter**.
2. On the **Access** step, choose whether the credential is **Personal** or **Company shared**, and which agents may use it.
3. Paste the API key. Paperclip stores it as a secret and it is not readable afterwards.

## Assign the credential

- **Set it as your default** for the provider, and agents configured to use the responsible user's connection draw on each person's own account.
- **Bind a specific connection** to the agent so every run uses that account.

Then set the agent's model to an `openrouter/`-prefixed id, for example `openrouter/anthropic/claude-sonnet-4.5`. The provider and model choice happens in the agent's configuration; the connection only supplies the credential.

> **Warning:** Authenticating successfully does not mean a particular model is available to you. OpenRouter decides which upstream models your account can route to, based on its own availability, your credit, and any provider-specific requirements. A key that works for one model can be refused for another.

## Try it

```txt
Reply with the single word: ready
```

Run it on an agent with an `openrouter/`-prefixed model. A one-word reply confirms credential, runtime, model routing, and assignment together for a negligible amount of credit.

If it fails, change only one thing at a time — the model id is the most common cause.

> **Note:** Illustrative task, not a recorded test result.

## Troubleshooting and limitations

| Problem | Likely cause | Fix |
| --- | --- | --- |
| *"Select an AI connection compatible with this harness and model"* | The model id does not start with `openrouter/`, or the agent is not on an OpenCode runtime | Fix the model id, or move the agent to an OpenCode runtime |
| There is no subscription option | Expected. OpenRouter is API key only | Use an API key |
| *"Connect an account and choose your personal default"* | The agent uses the responsible user's connection and that person has no default | Connect an account and mark it as your default |
| The key works but one model is refused | OpenRouter is not routing that model for your account | Choose another model, or check the model's requirements with OpenRouter |
| Runs fail once usage rises | OpenRouter credit is exhausted or a rate limit applied | Top up or check limits in your OpenRouter account |
| Status **needs attention** | The key was revoked or rotated | Reconnect with a current key |

Limitations: one connection is one OpenRouter account, and it grants no tool access. Only `openrouter/`-prefixed models are usable with it. Which upstream models are reachable is OpenRouter's decision, not Paperclip's.

## Related guides

- [Anthropic](anthropic.md), [OpenAI](openai.md), [Grok](xai.md) — the other model providers.
- [How connector access works](access-model.md)
- [OpenRouter documentation](https://openrouter.ai/docs)
