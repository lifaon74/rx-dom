import { detachNode } from '../../../node';

/**
 * Equivalent of:
 *  node.remove();
 */
export function nodeRemove(
  node: ChildNode,
): void {
  detachNode(node);
}

