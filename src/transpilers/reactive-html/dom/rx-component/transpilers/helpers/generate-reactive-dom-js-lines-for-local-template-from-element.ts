import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines,
  transpileReactiveHTMLElementToReactiveDOMJSLines,
} from '../../../element/transpile-reactive-html-element-to-reactive-dom-js-lines';
import { generateReactiveDOMJSLinesForRXTemplate } from '../rx-template/generate-reactive-dom-js-lines-for-rx-template';
import { generateReactiveDOMJSLinesForLocalTemplate } from './generate-reactive-dom-js-lines-for-local-template';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromElement = IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines;

export function generateReactiveDOMJSLinesForLocalTemplateFromElement(
  node: Element,
  templateName: string,
  argumentsLines: ILinesOrNull,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromElement>,
): ILines {
  return generateReactiveDOMJSLinesForLocalTemplate(
    generateReactiveDOMJSLinesForRXTemplate(
      argumentsLines,
      transpileReactiveHTMLElementToReactiveDOMJSLines(node, requireExternalFunction),
    ),
    templateName,
  );
}
