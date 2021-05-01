import { attachNode } from '../../../node';

/**
 * Equivalent of:
 *  parentNode.insertBefore<T extends Node>(node: T, referenceNode: Node | null): T;
 */
export function nodeInsertBefore<GNode extends Node>(
  parentNode: Node,
  node: GNode,
  referenceNode: Node | null,
): GNode {
  attachNode(node, parentNode, referenceNode);
  return node;
}
