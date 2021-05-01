import { detachNode } from '../../node/detach/detach-node';

/**
 * Nodes are expected 'attached'
 */
export function detachManyNodes(
  nodes: ArrayLike<ChildNode>,
): void {
  const length: number = nodes.length;
  for (let i = 0; i < length; i++) {
    detachNode(nodes[i]);
  }
}
