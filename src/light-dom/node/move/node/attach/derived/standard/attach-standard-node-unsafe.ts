import { getParentNode, IParentNode } from '../../../../../properties';
import { attachNodeRaw } from '../../attach-node-raw';
import { dispatchNodePositionChange } from '../../../on-node-position-change-listener';


export function attachStandardNodeUnsafe(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  const currentParentNode: IParentNode | null = getParentNode(node);
  attachNodeRaw(node, parentNode, referenceNode);
  dispatchNodePositionChange(node, currentParentNode);
}
