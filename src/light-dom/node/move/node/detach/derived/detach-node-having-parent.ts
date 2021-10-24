import { getParentNode, IParentNode } from '../../../../properties';
import { dispatchNodePositionChange } from '../../on-node-position-change-listener';
import { detachNodeRaw } from '../detach-node-raw';

// TODO verify for shadow root and document fragment
export function detachNodeHavingParent(
  node: ChildNode,
): void {
  const parentNode: IParentNode = getParentNode(node) as IParentNode;
  detachNodeRaw(node);
  dispatchNodePositionChange(node, parentNode);
}
