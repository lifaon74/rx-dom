import { getDocumentBody, nodeInsertBefore } from '../../light-dom';

export function bootstrap(
  node: Element,
  parentNode: Element = getDocumentBody(),
  referenceNode: Node | null = null,
): void {
  nodeInsertBefore(parentNode, node, referenceNode);
}

