import { attachNodeWithEvent } from '../attach-node-with-event';
import { detachNodeWithEvent } from '../detach-node-with-event';
import { isNodeNotMovingForInsertBefore } from '../../../../state/is-node-before-reference';
import { moveNodeWithEvent } from '../move-node-with-event';


/**
 * Nodes are expected 'attached' and continuous (nodes[0] <-> nodes[1] <-> ... )
 */
export function moveManyNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  const length: number = nodes.length;
  if (length !== 0) {
    if (!isNodeNotMovingForInsertBefore(nodes[length - 1], parentNode, referenceNode)) {
      for (let i = 0; i < length; i++) {
        const node: ChildNode = nodes[i];
        detachNodeWithEvent(node, true);
        attachNodeWithEvent(node, parentNode, referenceNode, true);
      }
    }
  }
}

/**
 * Nodes are expected 'attached'
 */
export function moveManyUnrelatedNodesWithEvent(
  nodes: ArrayLike<ChildNode>,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    moveNodeWithEvent(nodes[i], parentNode, referenceNode);
  }
}



