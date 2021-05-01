import { attachNode } from '../../node/attach/attach-node';

/**
 * Nodes are expected 'detached'
 */
export function attachManyNodes(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    attachNode(nodes[i], parentNode, referenceNode);
  }
}

