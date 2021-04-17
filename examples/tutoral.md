## rx-dom tutorial

[comment]: <> (`rx-dom` is fast and lightweight a framework to build user interface using [observables]&#40;https://github.com/lifaon74/rx-js-light&#41;.)

[comment]: <> (Your components are created from an angular like syntax &#40;html with special attributes and components, very close to the standard html&#41;.)

### Reactive HTML

`reactive html` is an angular like syntax (html with special attributes and components, very close to the standard html)
, which, when compiled to javascript, generates and mutates the DOM from observables, in a very efficient way.

As an example, if you want to generate a *div* with the class 'valid' when the observable `$.valid` emits *true*, you
may write:

```html
<div
  [class.valid]="$.valid"
></div>
```

And use `compileAndEvaluateReactiveHTMLAsComponentTemplate` to compile and evaluate this *reactive html* to javascript.

The complete syntax for `reactive html` may be found [HERE](../src/syntax.md)

### Component

#### Step 1 - define what you want to import into your component

The compiled `reactive html` is completely isolated: it doesn't import any functions, constants, or uses global
variables. Instead, everything must come from the caller of the function.

So the first step, is to define what will be required into your component: 

```ts
const CONSTANTS_TO_IMPORT = {
  ...DEFAULT_CONSTANTS_TO_IMPORT,
};
```

`DEFAULT_CONSTANTS_TO_IMPORT`: is the 'minimal' list of functions used by `rx-dom` when compiling some `reactive html`,
  you probably want to use them in each of your component.

⚠️ If your component is using custom elements (or other `rx-dom` elements), you'll need to define them too:

```ts
export const MY_COMPONENT_CUSTOM_ELEMENTS = [
  AppChildComponent,
];

const CONSTANTS_TO_IMPORT = {
  ...DEFAULT_CONSTANTS_TO_IMPORT,
  createElement: generateCreateElementFunctionWithCustomElements(MY_COMPONENT_CUSTOM_ELEMENTS),
};
```

This ensures that every custom element is properly included into your application, and you didn't forget anyone.


#### Step 2 - write your reactive html

We will write some `reactive html`: an input, which, when changed, immediately updates a validity check:

```ts
const reactiveHTML = `
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

const compiledTemplate = compileAndEvaluateReactiveHTMLAsComponentTemplate(reactiveHTML, CONSTANTS_TO_IMPORT);
```

In your `reactive html`, you have access to many variables:

- everything present in CONSTANTS_TO_IMPORT
- `$content`: a document fragment, containing the nodes that was present into your component before the template is injected
  (ak: `ng-content` for angular or `children` for react)
- `$`: the data coming from your component. It's an object containing some observables that you'll use to update the DOM.
 

Let's define an interface for `$`:

```ts
interface IData {
  input: IMulticastReplayLastSource<string>; // the value of the input
  remaining: ISubscribeFunction<number>; // how many caracters remains until the input is invalid (maxlength)
  valid: ISubscribeFunction<boolean>; // is the input valid ?
}
```

These data comes from the return of `onCreate` when your component is instantiated.

#### Step 3 - write your scoped css

Because HTML is nothing without css, let's style our component:

```ts
const css = `
  :host {
    display: block;
  }
  
  :host > .max-length-container:not(.valid) {
    color: red;
  }
`;

compileReactiveCSSAsComponentStyle(css);
```

The `:host` selector is used to select your component.

The style of a component **SHOULD ALWAYS** keeps its css encapsulated as much as possible:

- use `>`, or your css may leak on child components
- avoid applying style to other components (like `body`)

ℹ️ by choice `rx-dom` doesn't use the shadow DOM (we may easily activate this feature later, if the community asks for it).
Indeed, the shadow DOM forces encapsulation, but we often encounter the need to style child components from a
parent component.

#### Step 4 - create your component

`rx-dom` components are simply [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
with a decorator to initialize them properly:

- it registers the component (tag-name)
- it awaits on the component template and style, and then injects them
- it calls [some hook methods](../src/component/component/component-implements.ts), like `onCreate` or `onConnect`

```ts
/** COMPONENT **/

// the interface of the data available in the template
interface IData {
  input: IMulticastReplayLastSource<string>;
  remaining: ISubscribeFunction<number>;
  valid: ISubscribeFunction<boolean>;
}

// what to import in the context of the template
const CONSTANTS_TO_IMPORT = {
  ...DEFAULT_CONSTANTS_TO_IMPORT,
};

/**
 * A component is nothing more that a custom element with a decorator.
 */
@Component({
  name: 'app-hello-world', // the name of the component
  template: compileAndEvaluateReactiveHTMLAsComponentTemplate(`
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
  `, CONSTANTS_TO_IMPORT), // compiles some 'reactive html' into a component template
  style: compileReactiveCSSAsComponentStyle(`
    :host {
      display: block;
    }

    :host > .max-length-container:not(.valid) {
      color: red;
    }
  `), // compiles some 'reactive css' for a component
})
export class AppHelloWorldComponent extends HTMLElement implements OnCreate<IData> {
  protected readonly data: IData;

  constructor() {
    super();
    // 'input' is an source which contains and emits the value of our input
    const input = createMulticastReplayLastSource<string>({ initialValue: '' });

    // 'remaining' is an observable whose value is computed from the length of 'input'
    const remaining = pipeSubscribeFunction(input.subscribe, [
      mapSubscribePipe((value: string) => value.length)
    ]);

    // 'valid' is an observable whose value is true if 'remaining' is less than 10
    const valid = pipeSubscribeFunction(remaining, [
      mapSubscribePipe((value: number) => (value <= 10)),
    ]);

    this.data = {
      input,
      remaining,
      valid,
    };
  }

  // onCreate is called when the component is created to retrieve the data to inject into the template 
  public onCreate(): IData {
    return this.data;
  }
}
```

#### Step 5 - boostrap your application

The last step is to append you component into the body of your html's page:

```html
<html lang="en">
  <head>
    <title>My app</title>
  </head>
  <body>
  </body>
</html>
```

```ts
function run() {
  // the boostrap function is used to start your application:
  // it injects AppHelloWorldComponent into the body
  bootstrap(new AppHelloWorldComponent());
}

window.onload = run;
```

---

`rx-dom` components are simply custom elements, so you may expect writing directly:

```html
<html lang="en">
  <head>
    <title>My app</title>
  </head>
  <body>
    <app-hello-world></app-hello-world>
  </body>
</html>
```

However, this won't work for 2 reasons:

- `rx-dom` is intended to be tree-shacked and minified. If you don't explicitly boostrap or inject your main component,
  you'll end up with an app of 0KB of javascript. That's the exact same reason we use `generateCreateElementFunctionWithCustomElements`:
  to properly import every required components, else we may miss some custom elements
  (meaning a tag acting like a div for example, because the component is not defined).
- `rx-dom` doesn't use `document.body.appendChild` or any native DOM functions, because it tries to be context independent
  (may run on node and browser), and uses a faster *'connected'* detection algorithm that the `connectedCallback`.
  So, you must use `rx-dom` functions instead of native ones.



