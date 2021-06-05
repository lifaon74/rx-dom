import {
  ICompiledComponentTemplateFunction, ICompiledComponentTemplateFunctionVariables, IComponentTemplate
} from '../../component-template.type';

export function evaluateCompiledReactiveHtmlAsComponentTemplate<GData extends object>(
  compiledReactiveHTM: string,
  constantsToImport: object,
): IComponentTemplate<GData> {
  const fnc: ICompiledComponentTemplateFunction<GData> = new Function(
    'a',
    'b',
    `return(${ compiledReactiveHTM })(a,b);`,
  ) as ICompiledComponentTemplateFunction<GData>;

  return (variables: ICompiledComponentTemplateFunctionVariables<GData>): DocumentFragment => {
    return fnc(
      variables,
      constantsToImport,
    );
  };
}
