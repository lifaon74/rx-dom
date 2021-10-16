import { IComponentTemplateCompileOptions } from '../../../component/component-template/component-template.type';
import { indentLines, IObjectProperties } from '../../index';
import { ILines } from '../../types/lines.type';
import { transpileReactiveHTMLAsComponentTemplateFunctionToReactiveDOMJSLines } from './transpile-reactive-html-as-component-template-function-to-reactive-dom-js-lines';

export function transpileReactiveHTMLAsComponentTemplateModuleToReactiveDOMJSLines(
  html: string,
  constantsToImport?: IObjectProperties,
  options?: IComponentTemplateCompileOptions,
): ILines {
  return [
    `"use strict";`,
    `export default (`,
    ...indentLines(transpileReactiveHTMLAsComponentTemplateFunctionToReactiveDOMJSLines(html, constantsToImport, options)),
    `);`,
  ];
}


