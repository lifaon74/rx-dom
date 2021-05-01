import { getParentNode, IParentNode } from '../../../../properties';
import { detachNodeRaw } from '../detach-node-raw';
import { dispatchNodePositionChange } from '../../on-node-position-change-listener';

// TODO verify for shadow root and document fragment
export function detachNodeHavingParent(
  node: ChildNode,
): void {
  const parentNode: IParentNode = getParentNode(node) as IParentNode;
  detachNodeRaw(node);
  dispatchNodePositionChange(node, parentNode);
}
