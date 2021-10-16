import { ILinesOrNull } from '../../../../../types/lines.type';
import { transpileReactiveHTMLReactiveTextToReactiveDOMJSLines } from './transpile-reactive-html-reactive-text-to-reactive-dom-js-lines';

export function transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines(
  node: Text,
): ILinesOrNull {
  return transpileReactiveHTMLReactiveTextToReactiveDOMJSLines(node.data);
}

