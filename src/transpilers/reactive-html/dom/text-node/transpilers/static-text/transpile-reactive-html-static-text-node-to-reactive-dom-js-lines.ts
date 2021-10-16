import { ILinesOrNull } from '../../../../../types/lines.type';
import { transpileReactiveHTMLStaticTextToReactiveDOMJSLines } from './transpile-reactive-html-static-text-to-reactive-dom-js-lines';

export function transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines(
  node: Text,
): ILinesOrNull {
  return transpileReactiveHTMLStaticTextToReactiveDOMJSLines(node.data);
}
