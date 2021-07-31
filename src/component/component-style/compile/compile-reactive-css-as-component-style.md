## compileReactiveCSSAsComponentStyle

```ts
function compileReactiveCSSAsComponentStyle(
  css: string,
): HTMLStyleElement
```

Compiles some `component css` into a style sheet usable by some components.

### Example

```ts
compileReactiveCSSAsComponentStyle(`
  :host {
    display: block;
    background-color: #fafafa;
  }
`);
```
