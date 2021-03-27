import { IHTMLTemplate } from '../../../../light-dom/template/template.type';
import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction, ICompiledComponentTemplateFunction } from '../to-lines';


export function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  dataName?: string,
): IHTMLTemplate<GData> {
  const code: string = linesToString(
    compileReactiveHTMLAsComponentTemplateFunction(
      html,
      generateConstantsToImportForComponentTemplateFromObject(constantsToImport),
      dataName
    )
  );

  // const fnc: ICompiledComponentTemplateFunction<GData> = eval(code);

  const fnc: ICompiledComponentTemplateFunction<GData> = new Function(
    'a',
    'b',
    `return (${ code })(a, b);`,
  ) as ICompiledComponentTemplateFunction<GData>;

  return (data: GData): DocumentFragment => {
    return fnc(data, constantsToImport);
  };
}
