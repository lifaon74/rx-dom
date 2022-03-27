import { indentLines } from '../../helpers/lines-formatting-helpers';
import { ILines } from '../../types/lines.type';
import { generateDefaultRequireExternalFunction } from '../require-external/generate-default-require-external-function';
import { IRequireExternalFunction } from '../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines,
  transpileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines,
} from './transpile-reactive-html-as-raw-component-template-function-to-reactive-dom-js-lines';

/**
 * Returns lines with the shape of: IRawComponentTemplateFunctionWithImportsAsFirstArgument
 */
export function transpileReactiveHTMLAsRawComponentTemplateFunctionWithImportsAsFirstArgumentToReactiveDOMJSLines(
  html: string,
): ILines {
  const {
    toImport,
    result: bodyLines,
  } = generateDefaultRequireExternalFunction((requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines>): ILines => {
    return transpileReactiveHTMLAsRawComponentTemplateFunctionToReactiveDOMJSLines(html, requireExternalFunction);
  });

  const importLines: ILines = [
    `{`,
    ...indentLines(
      Array.from(toImport.values(), (value): string => {
        return `${value},`;
      }),
    ),
    `},`,
  ];

  return [
    `(`,
    ...indentLines([
      ...importLines,
      `...args`,
    ]),
    `) => {`,
    ...indentLines([
      `return (`,
      ...indentLines(bodyLines),
      `)(...args);`,
    ]),
    `}`,
  ];
}
