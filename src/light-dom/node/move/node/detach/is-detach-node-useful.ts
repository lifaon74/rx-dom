import { getParentNode } from '../../../properties';


export function isDetachNodeUseful(
  node: Node,
): node is ChildNode {
  return (getParentNode(node) !== null);
}
