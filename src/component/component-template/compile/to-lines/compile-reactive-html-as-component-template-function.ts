import {
  compileHTMLAsHTMLTemplate, DEFAULT_DATA_NAME, ILines, indentLines, IObjectProperties
} from '../../../../reactive-html';
import { DEFAULT_CONTENT_NAME } from '../../../../reactive-html/constants/default-content-name.constant';
import { IComponentTemplateCompileOptions } from '../../component-template.type';

export interface ICompiledComponentTemplateFunction<GData extends object = object> {
  (data: GData, content: DocumentFragment, constantsToImport: object): DocumentFragment;
}

export function compileReactiveHTMLAsComponentTemplateFunction(
  html: string,
  constantsToImport?: IObjectProperties,
  {
    dataName = DEFAULT_DATA_NAME,
    contentName = DEFAULT_CONTENT_NAME,
  }: IComponentTemplateCompileOptions = {},
): ILines {
  return [
    `(${ dataName }, ${ contentName }, constantsToImport) => {`,
    ...indentLines([
      `return (`,
      ...indentLines(compileHTMLAsHTMLTemplate(
        html,
        constantsToImport,
      )),
      `)({`,
      ...indentLines([
        `...constantsToImport,`,
        `${ dataName },`,
        `${ contentName },`,
      ]),
      `});`,
    ]),
    `}`,
  ];
}

