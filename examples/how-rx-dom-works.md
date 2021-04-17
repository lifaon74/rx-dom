## How rx-dom works

When you compile some `reactive html` with the function `compileAndEvaluateReactiveHTMLAsComponentTemplate` for example, it generates
a bunch of javascript code to build the DOM nodes, and links them with the observables you've provided. When the nodes are connected
to the DOM, `rx-dom` subscribes to these observables, and updates the nodes according to the received values.
Then, when they are no more connected, rx-dom unsubscribes to release resources.

So updating one observable will only affect the nodes that are bound to it.

### Example:

For example, if you compile this `reactive html`:

```ts
const templateString = `
  <div class="input-container">
    <input
      #input
      [value]="$.input.subscribe"
      (input)="() => $.input.emit(input.value)"
    >
  </div>
  <div
    class="max-length-container"
    [class.valid]="$.valid"
  >
    Length: {{ $.remaining }} / 10
  </div>
`;

console.log((await compileReactiveHTMLAsComponentTemplateFunctionOptimized(templateString, generateConstantsToImportForComponentTemplateFromObject(CONSTANTS_TO_IMPORT))).join('\n'));
```

You'll end up with this result:

```ts
export default ($: any, $content: any, constantsToImport: any) => {
  return (
    (
      {
        nodeAppendChild,
        createDocumentFragment,
        createTextNode,
        createReactiveTextNode,
        createElement,
        setAttributeValue,
        setReactiveProperty,
        setReactiveClass,
        setReactiveEventListener,
        $,
        $content,
      }
    ) => {
      const parentNode = createDocumentFragment();
      {
        const node = createElement("div");
        nodeAppendChild(parentNode, node);
        setAttributeValue(node, "class", "input-container");
        {
          const parentNode = node;
          {
            const node = createElement("input");
            nodeAppendChild(parentNode, node);
            var input = node;
            setReactiveProperty($.input.subscribe, node, "value");
            setReactiveEventListener(() => $.input.emit(input.value), node, "input");
          }
        }
      }
      {
        const node = createElement("div");
        nodeAppendChild(parentNode, node);
        setAttributeValue(node, "class", "max-length-container");
        setReactiveClass($.valid, node, "valid");
        {
          const parentNode = node;
          nodeAppendChild(parentNode, createTextNode("Length: "));
          nodeAppendChild(parentNode, createReactiveTextNode($.remaining));
          nodeAppendChild(parentNode, createTextNode(" / 10"));
        }
      }
      return parentNode;
    }
  )({
    ...constantsToImport,
    $,
    $content,
  });
};
```

The generated code completely isolates the component, and ensures that every external functions, constants, or code is
given as arguments. This way, the component is context independent (it may be rendered in node or browser).

`rx-dom` provides functions (defined in `CONSTANTS_TO_IMPORT`) to bind the nodes, or their properties/attributes with
observables. Example:

- `setReactiveProperty($.input.subscribe, node, "value")`: updates the property `value` of the node
  when `$.input.subscribe` changes
- `setReactiveClass($.valid, node, "valid")`: toggle the class `valid` of the node depending on the value emitted
  by `$.valid`
- `createReactiveTextNode($.remaining)`: creates a Text node which content comes from the observable `$.remaining`

Moreover, the nodes are not directly injected into the DOM using the well known `document.appendChild` but
using `nodeAppendChild` instead. This provides a faster *connected* / *disconnected* detection for the different nodes,
than a more traditional `connectedCallback` for example.






