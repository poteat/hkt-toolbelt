# Snippets

## Last YakGPT Message

Copy the last YakGPT message to the clipboard.

```js
copy(
  (f =>
    f(f(JSON.parse(localStorage['chat-store-v23']).state.chats).messages)
      .content)(x => x[x.length - 1])
)
```
