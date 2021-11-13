## rx-dom tutorial

[comment]: <> (`rx-dom` is fast and lightweight a framework to build user interface using [observables]&#40;https://github.com/lifaon74/rx-js-light&#41;.)

[comment]: <> (Your components are created from an angular like syntax &#40;html with special attributes and components, very close to the standard html&#41;.)

### Reactive HTML

`reactive html` is an angular like syntax (html with special attributes and components, very close to the standard html)
, which, when compiled to javascript, generates and mutates the DOM from observables, in a very efficient way.

As an example, if you want to generate a *div* with the class 'valid' when the observable `$.valid$` emits *true*, you
may write:

```html

<div
  [class.valid]="$.valid$"
></div>
```

And use the function `compileReactiveHTMLAsGenericComponentTemplate` to compile and evaluate this *reactive html* into
javascript.

The complete syntax for `reactive html` may be found [HERE](../src/syntax.md)

### Component

Let's create a file `hello-world.component.ts` in its own folder.

#### Step 1 - define what you want to import into your component (optional if you have nothing to import)

The compiled `reactive html` is completely isolated: it doesn't import any functions, constants, or use global
variables. Instead, everything must come from the caller of the function. This level of encapsulation allows `rx-dom` to
strongly minify you component and run then at extreme speed.

So, the first step is to define what will be required into your component:

```ts
const customElements = {
  // put your list of custom elements here
};
```

```ts
const modifiers = {
  // put your list of modifiers here
};
```

If a custom element or a modifier is detected in your template and is not included, it will trigger an explicit error. This ensures that
every custom element or modifier is properly imported into your application, and you didn't forget anyone.

#### Step 2 - write your reactive html

We will write some `reactive html`: an input, which, when changed, immediately updates a validity check:

```ts
const template = compileReactiveHTMLAsGenericComponentTemplate({
  html: `
      <div class="input-container">
        <input
          #input
          [value]="$.$input$.subscribe"
          (input)="() => $.$input$.emit(node.value)"
        >
      </div>
      <div
        class="max-length-container"
        [class.valid]="$.valid$"
      >
        Length: {{ $.remaining$ }} / 10
      </div>
   `,
  customElements, // optional
  modifiers, // optional
})
```

In your `reactive html`, you have access to these variables:

- `$content`: a document fragment, containing the nodes that was present into your component before the template is
  injected
  (ak: `ng-content` for angular or `children` for react)
- `$`: the data coming from your component. It's an object containing some observables that you'll use to update the
  DOM.

Let's define an interface for `$`:

```ts
interface IData {
  readonly $input$: IMulticastReplayLastSource<string>; // the value of the input
  readonly remaining$: ISubscribeFunction<number>; // how many caracters remains until the input is invalid (maxlength)
  readonly valid$: ISubscribeFunction<boolean>; // is the input valid ?
}
```

These data comes from the return of the method `onCreate` when your component is instantiated (seen in a short moment).

#### Step 3 - write your scoped css

Because HTML is nothing without css, let's style our component:

```ts
const styleSheet = compileReactiveCSSAsComponentStyle(`
  :host {
    display: block;
  }
  
  :host > .max-length-container:not(.valid) {
    color: red;
  }
`);
```

The `:host` selector is used to select your component.

The style of a component **SHOULD ALWAYS** keeps its css encapsulated as much as possible:

- use `>`, or your css may leak on child components
- avoid applying style to other components (like `body`)

[comment]: <> (ℹ️ `rx-dom` supports partially the shadow DOM, but we strongly discourage its usage **now**. Indeed, the shadow DOM)

[comment]: <> (forces encapsulation, but we often encounter the need to style child components from a parent component, and injecting)

[comment]: <> (style sheet for each component is not yet performant. We're awaiting)

[comment]: <> (on [Constructable Stylesheets]&#40;https://developers.google.com/web/updates/2019/02/constructable-stylesheets&#41; to go)

[comment]: <> (further.)

#### Step 4 - create your component

`rx-dom` components are
simply [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
with a decorator to initialize them:

- it registers the component (tag-name)
- it awaits on the component template and style, and then injects them
- it calls [some hook methods](../src/component/component/component-implements.ts), like `onCreate` or `onConnect`

```ts
/** COMPONENT **/

// the interface of the data available in the template
interface IData {
  readonly $input$: IMulticastReplayLastSource<string>;
  readonly remaining$: ISubscribeFunction<number>;
  readonly valid$: ISubscribeFunction<boolean>;
}

/**
 * A component is nothing more that a custom element with a decorator.
 */
@Component({
  name: 'app-hello-world',
  template: compileReactiveHTMLAsGenericComponentTemplate({
    html: `
      <div class="input-container">
        <input
          #input
          [value]="$.$input$.subscribe"
          (input)="() => $.$input$.emit(node.value)"
        >
      </div>
      <div
        class="max-length-container"
        [class.valid]="$.valid$"
      >
        Length: {{ $.remaining$ }} / 10
      </div>
   `,
  }),
  styles: [compileReactiveCSSAsComponentStyle(`
    :host {
      display: block;
    }

    :host > .max-length-container:not(.valid) {
      color: red;
    }
  `)],
})
export class AppHelloWorldComponent extends HTMLElement implements OnCreate<IData> {
  protected readonly data: IData;

  constructor() {
    super();
    // 'input' is an source which contains and emits the value of our input
    const input = let$$('');

    // 'remaining' is an observable whose value is computed from the length of 'input'
    const remaining = map$$(input.subscribe, (value: string) => value.length);

    // 'valid' is an observable whose value is true if 'remaining' is less than 10
    const valid = map$$(remaining, (value: number) => (value <= 10));

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

[comment]: <> (```ts)

[comment]: <> (export class AppHelloWorldComponent extends HTMLElement implements OnCreate<IData> {)

[comment]: <> (  protected readonly data: IData;)

[comment]: <> (  constructor&#40;&#41; {)

[comment]: <> (    super&#40;&#41;;)

[comment]: <> (    // 'input' is an source which contains and emits the value of our input)

[comment]: <> (    const input = createMulticastReplayLastSource<string>&#40;{ initialValue: '' }&#41;;)

[comment]: <> (    // 'remaining' is an observable whose value is computed from the length of 'input')

[comment]: <> (    const remaining = pipeSubscribeFunction&#40;input.subscribe, [)

[comment]: <> (      mapSubscribePipe&#40;&#40;value: string&#41; => value.length&#41;)

[comment]: <> (    ]&#41;;)

[comment]: <> (    // 'valid' is an observable whose value is true if 'remaining' is less than 10)

[comment]: <> (    const valid = pipeSubscribeFunction&#40;remaining, [)

[comment]: <> (      mapSubscribePipe&#40;&#40;value: number&#41; => &#40;value <= 10&#41;&#41;,)

[comment]: <> (    ]&#41;;)

[comment]: <> (    this.data = {)

[comment]: <> (      input,)

[comment]: <> (      remaining,)

[comment]: <> (      valid,)

[comment]: <> (    };)

[comment]: <> (  })

[comment]: <> (  // onCreate is called when the component is created to retrieve the data to inject into the template )

[comment]: <> (  public onCreate&#40;&#41;: IData {)

[comment]: <> (    return this.data;)

[comment]: <> (  })

[comment]: <> (})

[comment]: <> (```)

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

**WARNING**

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

However, this is prohibited for 2 reasons:

- `rx-dom` is intended to be tree-shacked and minified. So, if you don't explicitly boostrap or inject your main
  component, you'll probably end with zero imports, consequently you'll have an app of 0KB of javascript (components will be missing).
  That's why you have to declare and import your custom elements with the property `customElements` when using `compileReactiveHTMLAsGenericComponentTemplate`.
- `rx-dom` doesn't use `document.body.appendChild` or any native DOM functions: it tries to be context independent
  (may run on node and browser), and uses a faster *'connected'* detection algorithm that the `connectedCallback`. So,
  you must use `rx-dom` functions instead of native ones.
  For example, if you write `document.body.appendChild(new AppHelloWorldComponent())`, your application won't properly boot,
  and won't be ready for any future SSR.



