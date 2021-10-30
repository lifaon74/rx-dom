import { getDocumentBody } from '../../light-dom/node/explore/get-document-body';
import { nodeInsertBefore } from '../../light-dom/node/move/derived/dom-like/node/node-insert-before';

export function bootstrap(
  node: Element,
  parentNode: Element = getDocumentBody(),
  referenceNode: Node | null = null,
): void {
  nodeInsertBefore(parentNode, node, referenceNode);
}

