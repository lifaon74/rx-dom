[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/rx-dom.svg)](https://www.npmjs.com/package/@lifaon/rx-dom)
![npm](https://img.shields.io/npm/dm/@lifaon/rx-dom.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/rx-dom.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/rx-dom.svg)

# 🌱 rx-dom

[comment]: <> (https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom)

**rx-dom** is an [observable based](https://github.com/lifaon74/rx-js-light) library
for building single page applications with **very high performances** 🚀.
It gives you many tools to write and build dynamic html templates and components with a syntax similar to Angular.
However, by design, it strongly outperforms React and Angular due to its unique architecture:
when an Observable changes, it updates only the relevant DOM nodes, ensuring maximal efficiency.

To simplify: you'll create some dynamic variables, and **rx-dom** will take care to refresh the DOM,
with the precision of a surgeon and the speed of a rocket.


<details>
  <summary>🤨 Another framework for web-apps ? Isn't it redundant ?</summary>

  Currently `rx-dom` is a niche framework, but it has been built to have the absolute best performances.

  The current frameworks mostly use differ algorithms on complex data structures to refresh the DOM.
  The developers have a very simple and intuitive way to define their data, and see them magically reflected on the DOM.
  However, it costs a lot of javascript execution time, especially when changes append on the top-most parents.
  This cost is usually ignored because our machines are fast enough in most cases.
  And let's be honest: developers are lazy or constrained by time by the direction.
  Non optimized code is common and frequent.

  `rx-dom` is done for perfectionists: using Observables constraint you to work in Reactive Programming, using dynamic variables and Stores.
  It's complex, and discouraging for beginners, but it's so much more powerful and less error-prone.
  Observables are extremely strong, and gives you full control over async streams of data.
  `rx-dom` does a great usage of them, which optimizes the rendering of the DOM to the maximum.
  It results in performances as fast as native DOM manipulation, and code as small as possible,
  at the cost of a more complicated initial learning curve.

  In these cases, `rx-dom` is perfect:

  - you're comfortable with observables
  - you want to create some components embedded and working everywhere, with very small footprints
  - you want to create an application requiring critical performances
    (ex: displaying millions of DOM nodes, or working on very low-end devices)
  - you have the time a play with an exotic framework

  However, it's overcomplicated in these cases:

  - you're a beginner in javascript and never head of Observables
  - you don't give a f*ck about performances (like probably most of the developers 😒)

</details>

Moreover, it comes with an [AOT plugin for rollup](https://github.com/lifaon74/rx-dom-aot-plugin),
which strongly optimizes your components and generates very small bundles.

It's light, fast, and simple ! Give it a try !

- [Tutorial](src/documentation/tutorial/tutoral.md)
- [How it works](./src/documentation/examples/how-rx-dom-works.md)
- [Syntax](./src/documentation/syntax.md)


## 📑 Example

```ts
/** COMPONENT **/

// the interface of the data available in the template
interface IData {
  readonly $input: IObserver<string>;
  readonly input$: IObservable<string>;
  readonly remaining$: IObservable<number>;
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
    // 'input' is a source which contains and emits the value of our input
    const { emit: $input, subscribe: input$ } = let$$('');

    // 'remaining' is an observable whose value is computed from the length of 'input'
    const remaining$ = map$$(input$, (value: string) => value.length);

    // 'valid' is an observable whose value is true if 'remaining' is less than 10
    const valid$ = map$$(remaining$, (value: number) => (value <= 10));

    this.data = {
      $input,
      input$,
      remaining$,
      valid$,
    };
  }

  // onCreate is called when the component is created to retrieve the data to inject into the template
  public onCreate(): IData {
    return this.data;
  }
}
```

[//]: # (TODO update demo)

[Click here to see the live demo](https://stackblitz.com/edit/typescript-ydrjlp?file=hello-world.shortcuts.component.ts)

## 📦 Installation

```bash
yarn add @lifaon/rx-dom
# or
npm install @lifaon/rx-dom --save
```

**[SEED IN PROGRESS](https://github.com/lifaon74/rx-js-light-debug-vite)**

This library supports:

- **common-js** (require): transpiled as es6, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **browser** environment, you'll need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/rx-dom](https://cdn.skypack.dev/@lifaon/rx-dom)


---

#### Differences with other popular frameworks:

| Feature        | Angular | Virtual DOM (React, Vue) | rx-dom |
|----------------| --- | ---          | --- |
| **Semantics**  | html with special flavour | `jsx` or `hyperscript` | html with special flavour |
| **Memory**     | **medium**: data are directly reflected on the nodes, but the framework itself is heavy | **high** a lot of virtual DOM elements are created every time the DOM updates, and the number of virtual nodes is also linearly proportional to the size of the DOM tree. | **very low**: once the data pipeline is set, on every update the data is directly reflected on the node. |
| **CPU**        | **medium**: when zoneJs triggers, all expressions in the html are evaluated and reflected on the nodes | **high** because a lot of time is spent regenerating the Virtual DOM, calculating the diff and figuring out what changed. | **low**: the nodes subscribe only to the part of the data that is needed for rendering / updating them. It's almost unbeatable, because when the data changes, it directly updates the nodes. |
| **Size**       | ~50KB | ~10KB (preact) | ~8KB (with jit compiler), ~4KB (aot) |

*size is calculated for similar 'hello world' projects, compiled, minified and gzipped.

The current frameworks are pretty efficient, however, they are far from the perfect optimization.
**rx-dom** tries to do better by conciliating an elegant syntax with maximal performances.

For new incomers, learning [observables](https://github.com/lifaon74/rx-js-light) may be discouraging,
as it is a totally different manner to think your code,
but once you're comfortable with this principle, you'll fully enjoy the potential, and the performances they provide:

- fewer errors, especially on computed properties
- better resource managements: cancellation is part of observables
- faster rendering and updating

Obviously, current popular frameworks are more mature and offers more tools, having a very important community.
However, this project may close the gap in the future.




