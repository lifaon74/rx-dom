import { nullIfEmptyLines } from '../../../../../helpers';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { generateReactiveDOMJSLinesForStaticTextNode } from '../static-text';
import { generateReactiveDOMJSLinesForReactiveTextNode } from './generate-reactive-dom-js-lines-for-reactive-text-node';

/**
 * Syntax: {{ variable }}
 */

const REACTIVE_TEXT_NODE_PATTERN: string = '{{(.*?)}}';
const REACTIVE_TEXT_NODE_REGEXP: RegExp = new RegExp(REACTIVE_TEXT_NODE_PATTERN, 'g');

export function transpileReactiveHTMLReactiveTextToReactiveDOMJSLines(
  text: string,
): ILinesOrNull {
  const lines: ILines = [];

  REACTIVE_TEXT_NODE_REGEXP.lastIndex = 0;
  let match: RegExpExecArray | null;
  let index: number = 0;
  while ((match = REACTIVE_TEXT_NODE_REGEXP.exec(text)) !== null) {
    if (index !== match.index) {
      lines.push(...generateReactiveDOMJSLinesForStaticTextNode(text.substring(index, match.index)));
    }

    lines.push(...generateReactiveDOMJSLinesForReactiveTextNode(match[1].trim()));
    index = match.index + match[0].length;
  }

  if (index !== text.length) {
    lines.push(...generateReactiveDOMJSLinesForStaticTextNode(text.substring(index)));
  }

  return nullIfEmptyLines(lines);
}
