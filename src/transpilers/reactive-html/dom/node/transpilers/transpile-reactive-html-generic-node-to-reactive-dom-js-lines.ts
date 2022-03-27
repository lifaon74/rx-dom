import { ILinesOrNull } from '../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines,
  transpileReactiveHTMLElementToReactiveDOMJSLines,
} from '../../element/transpile-reactive-html-element-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines,
  transpileReactiveHTMLTextNodeToReactiveDOMJSLines,
} from '../../text-node/transpile-reactive-html-text-node-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodeToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines
  ;

export function transpileReactiveHTMLGenericNodeToReactiveDOMJSLines(
  node: Node,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodeToReactiveDOMJSLines>,
): ILinesOrNull {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return transpileReactiveHTMLTextNodeToReactiveDOMJSLines(node as Text, requireExternalFunction);
    // case Node.COMMENT_NODE:
    //   return null;
    case Node.ELEMENT_NODE:
      return transpileReactiveHTMLElementToReactiveDOMJSLines(node as Element, requireExternalFunction);
    default:
      return null;
  }
}
