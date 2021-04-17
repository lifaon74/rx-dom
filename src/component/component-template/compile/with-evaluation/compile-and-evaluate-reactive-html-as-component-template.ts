import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction, ICompiledComponentTemplateFunction } from '../to-lines';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../../component-template.type';


export function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): IComponentTemplate<GData> {
  const code: string = linesToString(
    compileReactiveHTMLAsComponentTemplateFunction(
      html,
      generateConstantsToImportForComponentTemplateFromObject(constantsToImport),
      options
    )
  );

  // const fnc: ICompiledComponentTemplateFunction<GData> = eval(code);

  const fnc: ICompiledComponentTemplateFunction<GData> = new Function(
    'a',
    'b',
    'c',
    `return (${ code })(a, b, c);`,
  ) as ICompiledComponentTemplateFunction<GData>;

  return (data: GData, content: DocumentFragment): DocumentFragment => {
    return fnc(data, content, constantsToImport);
  };
}
