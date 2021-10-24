## compileReactiveHTMLAsGenericComponentTemplate

```ts
interface ICompileReactiveHTMLAsGenericComponentTemplateOptions {
  html: string;
  customElements?: ArrayLike<HTMLElementConstructor>;
  modifiers?: ArrayLike<IGenericNodeModifier>;
}

function compileReactiveHTMLAsGenericComponentTemplate<GData extends object>(
  options: ICompileReactiveHTMLAsGenericComponentTemplateOptions,
): IComponentTemplate<GData>
```

Compiles some `reactive-html` ([syntax](../../../syntax.md)) into a `IComponentTemplate` (javascript code).

### Example

```ts
compileReactiveHTMLAsGenericComponentTemplate({
  html: `
    <div>
      {{ $.text$ }}
    </div>
  `,
});
```
