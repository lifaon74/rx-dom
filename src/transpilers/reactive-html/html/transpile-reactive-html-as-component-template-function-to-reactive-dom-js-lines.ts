import {
  ICompiledComponentTemplateFunctionVariables,
  IComponentTemplateCompileOptions,
} from '../../../component/component-template/component-template.type';
import { DEFAULT_CONTENT_NAME } from '../../constants/default-content-name.constant';
import { DEFAULT_DATA_NAME } from '../../constants/default-data-name.constant';
import { IObjectProperties, IObjectPropertyEntry } from '../../helpers/generate-object-properties-lines';
import { indentLines } from '../../helpers/lines-formatting-helpers';
import { ILines } from '../../types/lines.type';
import { transpileReactiveHTMLAsRXTemplateToReactiveDOMJSLines } from './transpile-reactive-html-as-rx-template-to-reactive-dom-js-lines';

type IKeyOfCompiledComponentTemplateFunctionVariables = keyof ICompiledComponentTemplateFunctionVariables<object>;

const DATA_KEY: IKeyOfCompiledComponentTemplateFunctionVariables = 'data';
const CONTENT_KEY: IKeyOfCompiledComponentTemplateFunctionVariables = 'content';

const CONSTANTS_NAME: string = 'constants';
const VARIABLES_NAME: string = 'variables';

export function transpileReactiveHTMLAsComponentTemplateFunctionToReactiveDOMJSLines(
  html: string,
  constantsToImport?: IObjectProperties,
  {
    dataName = DEFAULT_DATA_NAME,
    contentName = DEFAULT_CONTENT_NAME,
  }: IComponentTemplateCompileOptions = {},
): ILines {
  const variablesToRemap: IObjectProperties = [];

  if (dataName !== DATA_KEY) {
    variablesToRemap.push([dataName, `${VARIABLES_NAME}.${DATA_KEY}`]);
  }

  if (contentName !== CONTENT_KEY) {
    variablesToRemap.push([contentName, `${VARIABLES_NAME}.${CONTENT_KEY}`]);
  }

  return [
    `(${VARIABLES_NAME}, ${CONSTANTS_NAME}) => {`,
    ...indentLines([
      `return (`,
      ...indentLines(transpileReactiveHTMLAsRXTemplateToReactiveDOMJSLines(
        html,
        constantsToImport,
      )),
      `)({`,
      ...indentLines([
        `...${CONSTANTS_NAME},`,
        `...${VARIABLES_NAME},`,
        ...variablesToRemap.map(([propertyName, propertyValue]: IObjectPropertyEntry) => {
          return `${propertyName}: ${propertyValue},`;
        }),
      ]),
      `});`,
    ]),
    `}`,
  ];
}

