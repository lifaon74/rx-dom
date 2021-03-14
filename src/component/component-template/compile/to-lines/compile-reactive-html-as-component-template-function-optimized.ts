import { ILines, IObjectProperties, minifyHTML } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from './compile-reactive-html-as-component-template-function';

export async function compileReactiveHTMLAsComponentTemplateFunctionOptimized(
  html: string,
  constantsToImport?: IObjectProperties,
  dataName?: string,
): Promise<ILines> {
  return minifyHTML(html)
    .then((html: string) => {
      return compileReactiveHTMLAsComponentTemplateFunction(html, constantsToImport, dataName);
    });
}

