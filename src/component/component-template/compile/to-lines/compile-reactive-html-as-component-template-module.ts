import { ILines, indentLines, IObjectProperties } from '../../../../reactive-html';
import { compileReactiveHTMLAsComponentTemplateFunction } from './compile-reactive-html-as-component-template-function';


export function compileReactiveHTMLAsComponentTemplateModule(
  html: string,
  constantsToImport?: IObjectProperties,
  dataName?: string,
): ILines {
  return [
    `"use strict";`,
    `export default (`,
    ...indentLines(compileReactiveHTMLAsComponentTemplateFunction(html, constantsToImport, dataName)),
    `);`,
  ];
}


