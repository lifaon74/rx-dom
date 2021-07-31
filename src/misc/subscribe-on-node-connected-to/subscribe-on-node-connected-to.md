## subscribeOnNodeConnectedTo

```ts
function subscribeOnNodeConnectedTo<GValue>(
  node: Node,
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
  topParentNode?: Node,
): IUnsubscribeFunction
```

Uses [onNodeConnectedToWithImmediateCached](../../light-dom/node/state/on-node-connected-to/on-node-connected-to.md),
to subscribe to `subscribe` and sends the data into `emit`.

### Example

```ts
const node = new Text();

subscribeOnNodeConnectedTo(
  node,
  interval(1000),
  () => {
    node.data = new Date().toISOString();
  },
  document.body,
);

nodeAppendChild(node, document.body);
```
