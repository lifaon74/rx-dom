import { registerComponentTemplateForAOT } from '../../aot';
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
  const compiled: string = linesToString(
    compileReactiveHTMLAsComponentTemplateFunction(
      html,
      generateConstantsToImportForComponentTemplateFromObject(constantsToImport, options),
      options,
    )
  );

  const componentTemplate: IComponentTemplate<GData> = evaluateAndDebugCompiledReactiveHtmlAsComponentTemplate<GData>(
    compiled,
    constantsToImport,
  );

  registerComponentTemplateForAOT(componentTemplate, compiled);

  return componentTemplate;
}
