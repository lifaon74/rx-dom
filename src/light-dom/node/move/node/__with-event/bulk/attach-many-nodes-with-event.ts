import { attachNodeWithEvent } from '../attach-node-with-event';

/**
 * Nodes are expected 'detached'
 */
export function attachManyNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    attachNodeWithEvent(nodes[i], parentNode, referenceNode);
  }
}

