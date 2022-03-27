## 2.1.0 (unreleased)

### What's new ?

> The transpiling engine as been improved

It allows the AOT transpiler to generates smaller bundles with faster performances.

> The `customElements` of a component can now be deferred

It allows circular dependency for components: 

- component A requires component B
- and component B requires component A

> A component can now use itself into its template

The template of a component may now contain the element itself. For example, in a recursive tree list.

> Add support for complex property path when binding a property: `[propA.propB.propC]`

When binding a property, you can now specify a *property path* instead of a single property name.

```html
<div
  [propA.propB.propC]="observable"
></div>
```

> Add `IComponentInput`, and deprecate `defineObservableProperty`

`IComponentInput` is a new and cleaner way to define *Observable like inputs* for your components.

[//]: # (TODO doc)

### Breaking changes

- refactor `compileReactiveHTMLAsGenericComponentTemplate` as `compileReactiveHTMLAsComponentTemplate`
- refactor `compileReactiveHTMLAsGenericComponentTemplate` as `loadReactiveHTMLAsComponentTemplate`
