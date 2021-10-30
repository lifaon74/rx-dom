import { getParentNode, IParentNode } from '../../../../../properties/get-parent-node';
import { dispatchNodePositionChange } from '../../../on-node-position-change-listener';
import { attachNodeRaw } from '../../attach-node-raw';

export function attachStandardNodeUnsafe(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  const currentParentNode: IParentNode | null = getParentNode(node);
  attachNodeRaw(node, parentNode, referenceNode);
  dispatchNodePositionChange(node, currentParentNode);
}
