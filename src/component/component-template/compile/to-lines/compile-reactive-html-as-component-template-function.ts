import {
  compileHTMLAsHTMLTemplate, DEFAULT_DATA_NAME, ILines, indentLines, IObjectProperties, IObjectPropertyEntry
} from '../../../../reactive-html';
import { DEFAULT_CONTENT_NAME } from '../../../../reactive-html/constants/default-content-name.constant';
import {
  ICompiledComponentTemplateFunctionVariables, IComponentTemplateCompileOptions
} from '../../component-template.type';

type IKeyOfCompiledComponentTemplateFunctionVariables = keyof ICompiledComponentTemplateFunctionVariables<object>;

const DATA_KEY: IKeyOfCompiledComponentTemplateFunctionVariables = 'data';
const CONTENT_KEY: IKeyOfCompiledComponentTemplateFunctionVariables = 'content';

const CONSTANTS_NAME: string = 'constants';
const VARIABLES_NAME: string = 'variables';

export function compileReactiveHTMLAsComponentTemplateFunction(
  html: string,
  constantsToImport?: IObjectProperties,
  {
    dataName = DEFAULT_DATA_NAME,
    contentName = DEFAULT_CONTENT_NAME,
  }: IComponentTemplateCompileOptions = {},
): ILines {
  const variablesToRemap: IObjectProperties = [];

  if (dataName !== DATA_KEY) {
    variablesToRemap.push([dataName, `${ VARIABLES_NAME }.${ DATA_KEY }`]);
  }

  if (contentName !== CONTENT_KEY) {
    variablesToRemap.push([contentName, `${ VARIABLES_NAME }.${ CONTENT_KEY }`]);
  }

  return [
    `(${ VARIABLES_NAME }, ${ CONSTANTS_NAME }) => {`,
    ...indentLines([
      `return (`,
      ...indentLines(compileHTMLAsHTMLTemplate(
        html,
        constantsToImport,
      )),
      `)({`,
      ...indentLines([
        `...${ CONSTANTS_NAME },`,
        `...${ VARIABLES_NAME },`,
        ...variablesToRemap.map(([propertyName, propertyValue]: IObjectPropertyEntry) => {
          return `${ propertyName }: ${ propertyValue },`;
        })
      ]),
      `});`,
    ]),
    `}`,
  ];
}

