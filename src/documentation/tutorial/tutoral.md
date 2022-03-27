## Learn how to create your first AppHelloWorldComponent with rx-dom

**rx-dom** is an [observable based](https://github.com/lifaon74/rx-js-light) library
for building single page applications with **very high performances** 🚀.

Unlike, others popular front-end frameworks, its engineering is built to get the most of your application: it generates very small bundle size,
and create/update DOM node almost as the same seed as it was native. Moreover, its Observable based architecture
puts a soft but constraining framework around the data, allowing a better management of streams and async tasks.
It results in fewer errors, bugs and memory-leaks.

### Create a new *hello-world* project

```shell
git clone https://github.com/lifaon74/rx-dom-vite-seed
```

<details>
  <summary>If you prefer to set-up manually your ptoject</summary>

  Let's init a new *hello-world* project, using [vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) and typescript.
  
  ```shell
  yarn create vite hello-world --template vanilla-ts
  cd hello-world
  yarn
  ```
  
  And then install `rx-dom` and `rx-js-light`
  
  ```shell
  yarn add @lifaon/rx-dom
  yarn add @lifaon/rx-js-light
  ```
  
  Finally, delete the content of `src/index.ts` and create a `src/hello-world.component.ts` file.

</details>

Your project is ready 🎉 !


### Let's build the minimal AppHelloWorldComponent

`rx-dom` uses the native [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) as components.

So, the first step is to create an `AppHelloWorldComponent` class which extends an HTMLElement:

```ts
// hello-world.component.ts

export class AppHelloWorldComponent extends HTMLElement {}
```

Then, a component and its content are defined using the class decorator `@Component`:

```ts
// hello-world.component.ts
import { Component } from '@lifaon/rx-dom';

@Component({
  name: 'app-hello-world',
})
export class AppHelloWorldComponent extends HTMLElement {}
```

This decorator takes as input an object with a `name` property, which determines the tag name of your component.
To use this component into another template, you will directly write `<app-hello-world></app-hello-world>`.

However, in this example, the component will be used as the main entry point.
So, in order, to inject your component into the body of your application, you'll have to call the `bootstrap` function: 

```ts
// index.ts
import { bootstrap } from '@lifaon/rx-dom';
import { AppHelloWorldComponent } from './hello-world.component';

function main(): void {
  bootstrap(new AppHelloWorldComponent());
}

window.onload = main;
```

[Experiment this code on stackblitz](https://stackblitz.com/edit/typescript-syfakj?file=index.ts)

<details>
  <summary>Summary</summary>

  ```ts
  @Component({
    name: 'app-hello-world',
  })
  export class AppHelloWorldComponent extends HTMLElement {}

  function main(): void {
    bootstrap(new AppHelloWorldComponent());
  }
  
  window.onload = main;
  ```
</details>

Hurrah ! You've built your first `rx-dom` component 🥳.


### Add a html template to your component

The current *AppHelloWorldComponent* is empty, so we're going to add some content to it.

`rx-dom` uses a special syntax for its template called `reactive-html`. It's html with special attributes and tag names, similar to the Angular's template syntax.
You can find [the full syntax here](../syntax.md).

We will begin to create a simple `<input>`:

```html
<input
  [value]="$.input$"
>
```

To bind to an element's property, enclose it in square brackets, `[]`, which identifies the property as a target property.
A target property is the DOM property to which you want to assign a value.
For example, the target property in the previous code is the input element's `value` property.

The right-hand side of the assignment is an Observable.
`rx-dom` will subscribe to it and reflect the received values on the property.

Each template receives a `$` variable which is the data provided by the component.
In the previous code the Observable is `$.input$`.

The next step, is to use this template into your component:

```ts
// hello-world.component.ts
@Component({
  name: 'app-hello-world',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      <input
        [value]="$.input$"
      >
    `,
  }),
})
export class AppHelloWorldComponent extends HTMLElement {}
```

To build the template, you have to use the function `compileReactiveHTMLAsComponentTemplate`.
This function generates optimized javascript from your template, usable by your component.

Then, you must set the `template` property of your `@Component`'s configuration object, with the result of the previous function.

Wait wait wait ✋ !

This template requires some data, so the component must give it some.

We will start to define an interface for these data:

```ts
interface IData {
  readonly input$: IObservable<string>;
}
```

The `input.value` property expects a string. So we have to give an Observable of strings to `[value]="$.input$"`.

To create the Observable itself:

```ts
const { emit: $input, subscribe: input$ } = let$$<string>('Initial value');
```

The last step is to give the data to the template. It is done through the method `onCreate`:

```ts
onCreate(): IData {
  const { emit: $input, subscribe: input$ } = let$$<string>('Initial value');
  
  return {
    input$,
  };
}
```

This method is called by `rx-dom` right after your component has been instantiated,
and it returns the data present in the variable `$` of your template.

A good practice is to add `implements OnCreate<IData>` on your component's class, to ensure a proper typing.

[Experiment this code on stackblitz](https://stackblitz.com/edit/typescript-1atrw2?file=hello-world.component.ts)

<details>
  <summary>Summary</summary>


  ```ts
  interface IData {
    readonly input$: IObservable<string>;
  }
  
  @Component({
    name: 'app-hello-world',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <input
          [value]="$.input$"
        >
      `,
    }),
  })
  export class AppHelloWorldComponent extends HTMLElement implements OnCreate<IData> {
    onCreate(): IData {
      const { emit: $input, subscribe: input$ } = let$$<string>('Initial value');
      
      return {
        input$,
      };
    }
  }
  ```
</details>

Yay, you've come this far 😀 !

### Improve your html template

The component is still pretty rough: it only sets the value of an `<input>` from an Observable.
It still lacks of user interaction, so let's add more dynamism.

Update your `reactive-html` template:

```html
<div class="input-container">
  <input
    [value]="$.input$"
    (input)="() => $.$input(node.value)"
  >
</div>
<div
  class="max-length-container"
  [class.valid]="$.valid$"
>
  Length: {{ $.length$ }} / 10
</div>
```

> (input)="() => $.$input(node.value)"

To listen to an element's event, enclose it in parentheses, `()`.
`rx-dom` will subscribe to this event listener, with the right-hand side as the callback provided to `addEventListener`.
For example, in the previous code, it does something similar to this:

```ts
node.addEventListener('input', () => $.$input(node.value));
```

Translated, it gives: "When the `<input>` changes, send the `<input>`'s value to the Observer `$.$input`"

> [class.valid]="$.valid$"

We've seen earlier the bind property syntax, `[]`. It exists some shortcuts for css classes and styles.
In this code, we tell `rx-rom` to toggle the class `.valid` according to the values emitted by `$.valid$`.
So the class will only be present if the last value sent by `$.valid$` is `true`.

> Length: {{ $.length$ }} / 10

To bind to a Text Node value, enclose it in double curly brackets, `{{}}`.
The content of the assignment is an Observable.
`rx-dom` will subscribe to it and reflect the received values on the Text Node.
In this code, we tell `rx-dom` to create a Text Node whose cotent is updated from the values emitted by the Observable `$.length$`.


Alright, we have now to update the interface of your data:

```ts
interface IData {
  readonly $input: IObserver<string>;
  readonly input$: IObservable<string>;
  readonly length$: IObservable<number>;
  readonly valid$: IObservable<boolean>;
}
```

And now, let's create the data to provide to the template:

```ts
const length$ = map$$(input$, (value: string) => value.length);
```

`length$` is simply the length of the `<input>`'s value.

```ts
const valid$ = map$$(length$, (value: number) => (value <= 10));
```

`valid$` is computed from the `length$` Observable, and emits `true` if the `<input>`'s length is less than or equal to 10.

#### Add some css

Let's add some very simple css to our component to embellish it a little:

```css
:host {
  display: block;
}

:host > .max-length-container:not(.valid) {
  color: red;
}
```

To build this css, you have to use the function `compileReactiveCSSAsComponentStyle`.
This function generates optimized css usable by your component.

Then, you must set the `styles` property of your `@Component`'s configuration object:

```ts
styles: [
  compileReactiveCSSAsComponentStyle(`
    :host {
      display: block;
    }

    :host > .max-length-container:not(.valid) {
      color: red;
    }
  `),
]
```

Your component is now finished !

[Experiment this code on stackblitz](https://stackblitz.com/edit/typescript-oxgnvn?file=hello-world.component.ts)

<details>
  <summary>Summary</summary>

  ```ts
  interface IData {
    readonly $input: IObserver<string>;
    readonly input$: IObservable<string>;
    readonly length$: IObservable<number>;
    readonly valid$: IObservable<boolean>;
  }
  
  @Component({
    name: 'app-hello-world',
    template: compileReactiveHTMLAsComponentTemplate({
      html: `
        <div class="input-container">
          <input
            [value]="$.input$"
            (input)="() => $.$input(node.value)"
          >
        </div>
        <div
          class="max-length-container"
          [class.valid]="$.valid$"
        >
          Length: {{ $.length$ }} / 10
        </div>
      `,
    }),
    styles: [
      compileReactiveCSSAsComponentStyle(`
        :host {
          display: block;
        }
  
        :host > .max-length-container:not(.valid) {
          color: red;
        }
    `),
    ],
  })
  export class AppHelloWorldComponent
    extends HTMLElement
    implements OnCreate<IData>
  {
    onCreate(): IData {
      // 'input' is a source which contains and emits the value of our input
      const { emit: $input, subscribe: input$ } = let$$('');
  
      // 'length' is an observable whose value is computed from the length of 'input'
      const length$ = map$$(input$, (value: string) => value.length);
  
      // 'valid' is an observable whose value is true if 'length' is less than 10
      const valid$ = map$$(length$, (value: number) => value <= 10);
  
      return {
        $input,
        input$,
        length$,
        valid$,
      };
    }
  }
  ```
</details>

Phew, you've done it 😮‍💨 !

You've built a `rx-dom` component which displays an `<input>`, it's length, and a red warning if the text is too long.


