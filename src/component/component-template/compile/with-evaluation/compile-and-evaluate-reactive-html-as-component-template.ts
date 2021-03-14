import { IHTMLTemplate } from '../../../../light-dom/template/template.type';
import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction, ICompiledComponentTemplateFunction } from '../to-lines';


export function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  dataName?: string,
): IHTMLTemplate<GData> {
  const fnc: ICompiledComponentTemplateFunction<GData> = eval(
    linesToString(
      compileReactiveHTMLAsComponentTemplateFunction(
        html,
        generateConstantsToImportForComponentTemplateFromObject(constantsToImport),
        dataName
      )
    )
  );
  return (data: GData): DocumentFragment => {
    return fnc(data, constantsToImport);
  };
}
