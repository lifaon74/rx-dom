import { nodeInsertBefore } from './node-insert-before';

/**
 * Equivalent of:
 *  parentNode.appendChild<T extends Node>(node: T): T;
 */
export function nodeAppendChild<GNode extends Node>(
  parentNode: Node,
  node: GNode,
): GNode {
  return nodeInsertBefore<GNode>(parentNode, node, null);
}
