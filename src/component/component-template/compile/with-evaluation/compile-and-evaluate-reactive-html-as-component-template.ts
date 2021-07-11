import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from '../to-lines';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../../component-template.type';
import { evaluateAndDebugCompiledReactiveHtmlAsComponentTemplate } from './evaluate-and-debug-compiled-reactive-html-as-component-template';


export function compileAndEvaluateReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): IComponentTemplate<GData> {
  return evaluateAndDebugCompiledReactiveHtmlAsComponentTemplate<GData>(
    linesToString(
      compileReactiveHTMLAsComponentTemplateFunction(
        html,
        generateConstantsToImportForComponentTemplateFromObject(constantsToImport, options),
        options,
      )
    ),
    constantsToImport,
  );
}
