## compileAndEvaluateReactiveHTMLAsComponentTemplate

```ts
function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): IComponentTemplate<GData>
```

Compiles some `reactive-html` ([syntax](../../../../syntax.md)) into a `IComponentTemplate` (javascript code).

### Example

```ts
compileAndEvaluateReactiveHTMLAsComponentTemplate(`
  <div>
    {{ $.text$ }}
  </div>
`);
```
