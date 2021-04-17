import { ILines, IObjectProperties, minifyHTML } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from './compile-reactive-html-as-component-template-function';
import { IComponentTemplateCompileOptions } from '../../component-template.type';

export async function compileReactiveHTMLAsComponentTemplateFunctionOptimized(
  html: string,
  constantsToImport?: IObjectProperties,
  options?: IComponentTemplateCompileOptions,
): Promise<ILines> {
  return minifyHTML(html)
    .then((html: string) => {
      return compileReactiveHTMLAsComponentTemplateFunction(html, constantsToImport, options);
    });
}

