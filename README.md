[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/rx-dom.svg)](https://www.npmjs.com/package/@lifaon/rx-dom)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@lifaon/rx-dom.svg)
![npm](https://img.shields.io/npm/dm/@lifaon/rx-dom.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/rx-dom.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/rx-dom.svg)


# 📑 rx-dom

**WORK IN PROGRESS - NOT READY FOR USE**


[comment]: <> (https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom)

**rx-dom** is an [observable based](https://github.com/lifaon74/rx-js-light) library for building very high performance user interfaces.

It binds DOM nodes with observables to automatically update only the relevant nodes, ensuring maximal efficiency.

It's light, fast, and simple ! Give it a try !


## 📦 Installation

```bash
yarn add @lifaon/rx-dom
# or
npm install @lifaon/rx-dom --save
```

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/rx-dom](https://cdn.skypack.dev/@lifaon/rx-dom)


---

#### Differences with other popular frameworks:

Popular frameworks are more mature and offers more tools, but this project may close the gap in the future.
Here we'll speak only on the methods used by the frameworks to update the DOM, and how this library improved these weaknesses.

##### Angular

Angular uses [zone.js](https://github.com/angular/zone.js/) to refresh the DOM:

- it binds the nodes with the *expressions* we assigned to them
- when an async function executes in the context of your component, it re-evaluates all these *expressions* to refresh the DOM

It's very efficient, and offers a simple syntax, but with hundreds of properties per component it's not optimal, as all of them are evaluated each time.

**rx-dom** only updates the nodes bound with an observable. So updating one property only changes the nodes which listen to it.


##### React (or any virtual DOM based framework like Vue.js)

It uses [hooks](https://reactjs.org/docs/hooks-intro.html) to re-generate a VirtualDOM and reflect it on the DOM.

Actually *hooks* are extremely close to observables, but re-generating each time the VirtualDOM when a hook is updated is not efficient at all.

Check [this comparison table](https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom) for more details.


At the end, we may conclude that current framework trade a lot of the performances for an elegant syntax.
**rx-dom** tries to accomplish both: an elegant syntax with maximal performances.



