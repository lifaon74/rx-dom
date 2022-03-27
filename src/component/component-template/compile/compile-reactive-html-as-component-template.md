## compileReactiveHTMLAsComponentTemplate

```ts
interface ICompileReactiveHTMLAsComponentTemplateOptions {
  html: string;
  customElements?: ArrayLike<HTMLElementConstructor>;
  modifiers?: ArrayLike<IGenericElementModifier>;
}

function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  options: ICompileReactiveHTMLAsComponentTemplateOptions,
): IComponentTemplate<GData>
```

Compiles some `reactive-html` ([syntax](../../../documentation/syntax.md)) into a `IComponentTemplate` (javascript code).

### Example

```ts
compileReactiveHTMLAsComponentTemplate({
  html: `
    <div>
      {{ $.text$ }}
    </div>
  `,
});
```
