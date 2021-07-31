## bootstrap

```ts
function bootstrap(
  node: Element,
  parentNode?: Element,
  referenceNode?: Node | null,
): void
```

Boostrap your application with your main component.

Simply does:

```ts
nodeInsertBefore(parentNode, node, referenceNode);
```

### Example

```ts
bootstrap(new AppMainComponent());
```
