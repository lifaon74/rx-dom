import {
  compileHTMLAsHTMLTemplate, DEFAULT_DATA_NAME, ILines, indentLines, IObjectProperties
} from '../../../../reactive-html';

export interface ICompiledComponentTemplateFunction<GData extends object = object> {
  (data: GData, constantsToImport: object): DocumentFragment;
}

export function compileReactiveHTMLAsComponentTemplateFunction(
  html: string,
  constantsToImport?: IObjectProperties,
  dataName: string = DEFAULT_DATA_NAME,
): ILines {
  return [
    `(${ dataName }, constantsToImport) => {`,
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
      ]),
      `});`,
    ]),
    `}`,
  ];
}

