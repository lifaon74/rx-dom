import { nullIfEmptyLines } from '../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodeToReactiveDOMJSLines,
  transpileReactiveHTMLNodeToReactiveDOMJSLines,
} from '../../node/transpile-reactive-html-node-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodesToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLNodeToReactiveDOMJSLines
  ;

export function transpileReactiveHTMLGenericNodesToReactiveDOMJSLines(
  nodes: ArrayLike<Node>,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodesToReactiveDOMJSLines>,
): ILinesOrNull {
  const lines: ILines = [];
  for (let i = 0, l = nodes.length; i < l; i++) {
    const result: ILinesOrNull = transpileReactiveHTMLNodeToReactiveDOMJSLines(nodes[i], requireExternalFunction);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}
