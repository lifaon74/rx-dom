import { ILinesOrNull } from '../../../../../types/lines.type';
import { generateReactiveDOMJSLinesForStaticTextNode } from './generate-reactive-dom-js-lines-for-static-text-node';

export function transpileReactiveHTMLStaticTextToReactiveDOMJSLines(
  text: string,
): ILinesOrNull {
  return (text === '')
    ? null
    : generateReactiveDOMJSLinesForStaticTextNode(text);
}
