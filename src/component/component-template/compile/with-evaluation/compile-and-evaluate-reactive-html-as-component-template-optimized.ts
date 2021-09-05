import { generateConstantsToImportForComponentTemplateFromObject } from '../../misc/generate-constants-to-import-for-component-template-from-object';
import { ILines, linesToString } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunctionOptimized } from '../to-lines';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../../component-template.type';
import { evaluateCompiledReactiveHtmlAsComponentTemplate } from './evaluate-compiled-reactive-html-as-component-template';

/**
 * EXPERIMENTAL
 * @deprecated
 */
export function compileAndEvaluateReactiveHTMLAsComponentTemplateOptimized<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): Promise<IComponentTemplate<GData>> {
  return compileReactiveHTMLAsComponentTemplateFunctionOptimized(
    html,
    generateConstantsToImportForComponentTemplateFromObject(constantsToImport, options),
    options,
  )
    .then((lines: ILines) => {
      return evaluateCompiledReactiveHtmlAsComponentTemplate<GData>(
        linesToString(lines),
        constantsToImport,
      );
    });
}
