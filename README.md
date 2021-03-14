[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/rx-dom.svg)](https://www.npmjs.com/package/@lifaon/rx-dom)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@lifaon/rx-dom.svg)
![npm](https://img.shields.io/npm/dm/@lifaon/rx-dom.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/rx-dom.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/rx-dom.svg)

# 🌱 rx-dom

[comment]: <> (https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom)

**rx-dom** is an [observable based](https://github.com/lifaon74/rx-js-light) library for building very high performance user interfaces:
you get the angular like syntax with a near native performance.

It binds for you the DOM nodes with observables to automatically update only the relevant nodes, ensuring maximal efficiency.

It's light, fast, and simple ! Give it a try !

[SYNTAX](./src/syntax.md)


## 📦 Installation

**ALPHA**: the lib is currently in alpha, meaning it's stable enough for 80% of its functions,
but some may evolve in the future. Feel free to test and give feedback.

```bash
yarn add @lifaon/rx-dom
# or
npm install @lifaon/rx-dom --save
```

**[seed coming soon](https://github.com/lifaon74/rx-js-light-debug-vite)**

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
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

Feature | Angular | Virtual DOM | rx-dom
---     |--- |---          | ---
**Semantics**| html with special flavour | `jsx` or `hyperscript` | html with special flavour
**Memory** | **medium**: data are directly reflected on the nodes, but the framework itself is heavy | **high** a lot of virtual DOM elements are created every time the DOM updates, and the number of virtual nodes is also linearly proportional to size of the DOM tree. | **very low**: once the data pipeline is set, on every update the data is directly reflected on the node.
**CPU** | **medium**: when zoneJs triggers, all expressions in the html are evaluated and reflected on the nodes | **high** because a lot of time is spent regenerating the Virtual DOM, calculating the diff and figuring out what changed. | **low**: the nodes subscribe only to the part of the data that is needed for rendering / updating them. It's almost unbeatable, because when the data changes, it directly updates the nodes.
**Size** | ~50KB | ~10KB (preact) | ~10KB (with jit compiler), <4KB (aot)

*size is calculated for: 'hello world' project, compiled, minified and gzipped.

**rx-dom** anticipated aot (compiled when bundling, instead of doing it in the browser):
this would remove a few bytes coming from the jit compiler, and fasten the execution.
It currently lacks of its own cli, so AOT will be available in a future release.

We may conclude that current frameworks are pretty efficient, but are not as optimized as they could be.
**rx-dom** tries to do better by conciliating an elegant syntax with maximal performances.

The learning curve about [observables](https://github.com/lifaon74/rx-js-light) is a little longer,
but once you're comfortable with this principle, you'll fully enjoy the potential, and the performances it provides.

Obviously, current popular frameworks are more mature and offers more tools, having a very important community.
However, this project may close the gap in the future.




