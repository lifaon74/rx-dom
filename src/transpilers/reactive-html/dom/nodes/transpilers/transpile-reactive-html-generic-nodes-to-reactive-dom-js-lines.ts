import { nullIfEmptyLines } from '../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { transpileReactiveHTMLNodeToReactiveDOMJSLines } from '../../node/transpile-reactive-html-node-to-reactive-dom-js-lines';

export function transpileReactiveHTMLGenericNodesToReactiveDOMJSLines(
  nodes: ArrayLike<Node>,
): ILinesOrNull {
  const lines: ILines = [];
  for (let i = 0, l = nodes.length; i < l; i++) {
    const result: ILinesOrNull = transpileReactiveHTMLNodeToReactiveDOMJSLines(nodes[i]);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}
