## node modifier

A `node-modifier` is a function that takes a Node in input with some optional arguments,
and returns the same Node or another one.

It may:

- modify the Node content, properties, attributes, etc...
- generate a new one, with a completely different structure (and/or even a different type) and return it

⚠️ using `node-modifier` allows you very fine control of your elements, however,
this may easily lead to **unsafe or sensitive operations**.
Consequently, when possible you should think first to alternatives.

To create a `node-modifier` for an HTMLElement, we may use the `createElementModifier` function:

```ts
const tooltipModifier = createElementModifier('tooltip', (element: HTMLElement, value: string): HTMLElement => {
  element.title = value;
  return element;
});
```

Then we may use it into some `reactive-html`:

```html
compileReactiveHTMLAsGenericComponentTemplate({
  html: `
    <div $tooltip="['hello world !']">
      some content
    </div>
  `,
  modifiers: [
    tooltipModifier,
  ],
})
```

It compiles to something similar to this:

```ts
// here 'node' is the div
const newNode = getNodeModifier('tooltip')(node, ...['hello world !']);
```

Which expands to: 

```ts
const newNode = ((element: HTMLElement, value: string): HTMLElement => {
  element.title = value;
  return element;
})(node, 'hello world !');
```

---

## Example:

```ts
const tooltipModifier = createElementModifier('tooltip', (element: HTMLElement, value: string): HTMLElement => {
  element.title = value;
  return element;
});


/*---*/

@Component({
  name: 'app-main',
  template: compileReactiveHTMLAsGenericComponentTemplate({
    html: `
      <div $tooltip="['hello world !']">
        some content
      </div>
    `,
    modifiers: [
      tooltipModifier,
    ],
  }),
})
class AppMainComponent extends HTMLElement {
  constructor() {
    super();
  }
}

bootstrap(new AppMainComponent());
```

[comment]: <> (TODO playgroud)
