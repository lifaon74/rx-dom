import { nullIfEmptyLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  generateReactiveDOMJSLinesForStaticTextNode,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode,
} from '../static-text/generate-reactive-dom-js-lines-for-static-text-node';
import {
  generateReactiveDOMJSLinesForReactiveTextNode,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveTextNode,
} from './generate-reactive-dom-js-lines-for-reactive-text-node';

/**
 * Syntax: {{ variable }}
 */

const REACTIVE_TEXT_NODE_PATTERN: string = '{{(.*?)}}';
const REACTIVE_TEXT_NODE_REGEXP: RegExp = new RegExp(REACTIVE_TEXT_NODE_PATTERN, 'g');

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveTextNode
  ;

export function transpileReactiveHTMLReactiveTextToReactiveDOMJSLines(
  text: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextToReactiveDOMJSLines>,
): ILinesOrNull {
  const lines: ILines = [];

  REACTIVE_TEXT_NODE_REGEXP.lastIndex = 0;
  let match: RegExpExecArray | null;
  let index: number = 0;
  while ((match = REACTIVE_TEXT_NODE_REGEXP.exec(text)) !== null) {
    if (index !== match.index) {
      lines.push(...generateReactiveDOMJSLinesForStaticTextNode(text.substring(index, match.index), requireExternalFunction));
    }

    lines.push(...generateReactiveDOMJSLinesForReactiveTextNode(match[1].trim(), requireExternalFunction));
    index = match.index + match[0].length;
  }

  if (index !== text.length) {
    lines.push(...generateReactiveDOMJSLinesForStaticTextNode(text.substring(index), requireExternalFunction));
  }

  return nullIfEmptyLines(lines);
}
