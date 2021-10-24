## onNodeConnectedTo

```ts
function onNodeConnectedTo(
  node: Node,
  parentNode?: Node,
  options?: IOnNodeConnectedToOptions,
): ISubscribeFunction<boolean>
```

This function detects when `node` is connected to `parentNode` (default: `document`). Its returns a SubscribeFunction
that emits *true* if the node is connected, else *false*.

⚠️ This function only works if you user rx-dom build in function to mutate the DOM:

- nodeAppendChild
- nodeInsertBefore
- nodeRemove
- etc...

It's a faster detection algorithm, than the traditional `MutationObserver` or `connectedCallback / disconnectedCallback`

### Example

```ts
onNodeConnectedTo(element, document.body)((connected: boolean) => {
  console.log(`Node is ${ connected ? 'connected' : 'not connected' }`);
});
```

### onNodeConnectedToWithImmediateCached

Optimization of `onNodeConnectedTo` that share some internal context, to improve performances; and emits immediately the
state of the node.

ℹ️ you should prefer to use this particular function instead of `onNodeConnectedTo`.

