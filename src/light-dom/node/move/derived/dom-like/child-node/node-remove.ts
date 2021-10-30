import { detachNode } from '../../../node/detach/detach-node';

/**
 * Equivalent of:
 *  node.remove();
 */
export function nodeRemove(
  node: ChildNode,
): void {
  detachNode(node);
}

