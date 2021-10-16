import { ILinesOrNull } from '../../../../types/lines.type';
import { transpileReactiveHTMLElementToReactiveDOMJSLines } from '../../element/transpile-reactive-html-element-to-reactive-dom-js-lines';
import { transpileReactiveHTMLTextNodeToReactiveDOMJSLines } from '../../text-node/transpile-reactive-html-text-node-to-reactive-dom-js-lines';

export function transpileReactiveHTMLGenericNodeToReactiveDOMJSLines(
  node: Node,
): ILinesOrNull {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return transpileReactiveHTMLTextNodeToReactiveDOMJSLines(node as Text);
    case Node.COMMENT_NODE:
      return null;
    case Node.ELEMENT_NODE:
      return transpileReactiveHTMLElementToReactiveDOMJSLines(node as Element);
    default:
      return null;
  }
}
