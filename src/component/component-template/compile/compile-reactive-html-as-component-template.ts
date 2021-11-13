import { linesToString } from '../../../transpilers/helpers/lines-formatting-helpers';
import { transpileReactiveHTMLAsComponentTemplateFunctionToReactiveDOMJSLines } from '../../../transpilers/reactive-html/html/transpile-reactive-html-as-component-template-function-to-reactive-dom-js-lines';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../component-template.type';
import { generateConstantsToImportForComponentTemplateFromObject } from '../misc/generate-constants-to-import-for-component-template-from-object';
import { evaluateTranspiledReactiveHTMLAsComponentTemplate } from './evaluate-transpiled-reactive-html-as-component-template';

export function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object,
  options?: IComponentTemplateCompileOptions,
): IComponentTemplate<GData> {
  return evaluateTranspiledReactiveHTMLAsComponentTemplate<GData>(
    linesToString(
      transpileReactiveHTMLAsComponentTemplateFunctionToReactiveDOMJSLines(
        html,
        generateConstantsToImportForComponentTemplateFromObject(constantsToImport, options),
        options,
      ),
    ),
    constantsToImport,
  );
}
