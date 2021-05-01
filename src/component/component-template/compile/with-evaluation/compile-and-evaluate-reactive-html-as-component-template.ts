import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from '../to-lines';
import {
  ICompiledComponentTemplateFunction, ICompiledComponentTemplateFunctionVariables, IComponentTemplate,
  IComponentTemplateCompileOptions
} from '../../component-template.type';


export function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): IComponentTemplate<GData> {
  const code: string = linesToString(
    compileReactiveHTMLAsComponentTemplateFunction(
      html,
      generateConstantsToImportForComponentTemplateFromObject(constantsToImport, options),
      options,
    )
  );

  // const fnc: ICompiledComponentTemplateFunction<GData> = eval(code);

  const fnc: ICompiledComponentTemplateFunction<GData> = new Function(
    'a',
    'b',
    `return (${ code })(a, b);`,
  ) as ICompiledComponentTemplateFunction<GData>;

  return (variables: ICompiledComponentTemplateFunctionVariables<GData>): DocumentFragment => {
    return fnc(
      variables,
      constantsToImport,
    );
  };
}
