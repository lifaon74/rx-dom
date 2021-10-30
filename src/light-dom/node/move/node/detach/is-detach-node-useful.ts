import { getParentNode } from '../../../properties/get-parent-node';

export function isDetachNodeUseful(
  node: Node,
): node is ChildNode {
  return (getParentNode(node) !== null);
}
