# How rx-dom works

When you compile some `reactive html` with the function `compileReactiveHTMLAsGenericComponentTemplate` for example, it generates
a bunch of javascript code to build the DOM nodes, and links them with the observables you've provided. When the nodes are connected
to the DOM, `rx-dom` subscribes to these observables, and updates the nodes according to the received values.
Then, when they are no more connected, rx-dom unsubscribes to release resources.

So updating one observable will only affect the nodes that are bound to it.

## Example:

For example, if you compile this `reactive html`:

```ts
console.log(
  compileReactiveHTMLAsGenericComponentTemplate({
    html: `
      <div class="input-container">
        <input
          #input
          [value]="$.$input$.subscribe"
          (input)="() => $.$input$.emit(getNodeReference('input').value)"
        >
      </div>
      <div
        class="max-length-container"
        [class.valid]="$.valid$"
      >
        Length: {{ $.remaining$ }} / 10
      </div>
   `,
  })
    .toString()
);
```

You'll end up with something similar to this:

```ts
({getNodeReference, setNodeReference, data: $}) => {
  const parentNode = createDocumentFragment();
  {
    const node = createElement("div");
    setAttributeValue(node, "class", "input-container");
    {
      const parentNode = node;
      {
        const node = createElement("input");
        setNodeReference("input", node);
        setReactiveEventListener(() => $.$input$.emit(getNodeReference('input').value), node, "input");
        setReactiveProperty(toSubscribeFunction($.$input$.subscribe), node, "value");
        nodeAppendChild(parentNode, node);
      }
    }
    nodeAppendChild(parentNode, node);
  }
  {
    const node = createElement("div");
    setAttributeValue(node, "class", "max-length-container");
    setReactiveClass(toSubscribeFunction($.valid$), node, "valid");
    {
      const parentNode = node;
      nodeAppendChild(parentNode, createTextNode("Length: "));
      nodeAppendChild(parentNode, createReactiveTextNode(toSubscribeFunction($.remaining$)));
      nodeAppendChild(parentNode, createTextNode(" / 10"));
    }
    nodeAppendChild(parentNode, node);
  }
  return parentNode;
}
```

The generated code completely isolates the component, and ensures that every external functions, constants, or code is
given as arguments. This way, the component is context independent (it may be rendered in browser or node (in the future for ssr)).

`rx-dom` provides and injects functions to bind the nodes, or their properties/attributes with
observables. Example:

- `setReactiveProperty($.$input$.subscribe, node, "value")`: updates the property `value` of the node
  when `$.$input$.subscribe` changes
- `setReactiveClass($.valid$, node, "valid")`: toggle the class `valid` of the node depending on the value emitted
  by `$.valid$`
- `createReactiveTextNode($.remaining$)`: creates a Text node which content comes from the observable `$.remaining$`

Moreover, the nodes are not directly injected into the DOM using the well known `document.appendChild` but
using `nodeAppendChild` instead:

- faster *connected* / *disconnected* detection for the different nodes,
than the more traditional `connectedCallback`.
- better minification (object's properties cannot be mangled, but function's names can)
- independent of the context (may work on nodejs without touching the compiled code)





