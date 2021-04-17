import { ILines, indentLines, IObjectProperties } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from './compile-reactive-html-as-component-template-function';
import { IComponentTemplateCompileOptions } from '../../component-template.type';


export function compileReactiveHTMLAsComponentTemplateModule(
  html: string,
  constantsToImport?: IObjectProperties,
  options?: IComponentTemplateCompileOptions,
): ILines {
  return [
    `"use strict";`,
    `export default (`,
    ...indentLines(compileReactiveHTMLAsComponentTemplateFunction(html, constantsToImport, options)),
    `);`,
  ];
}


