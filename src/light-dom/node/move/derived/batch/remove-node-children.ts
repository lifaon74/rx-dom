import { getFirstChild } from '../../../properties/get-first-child';
import { nodeRemove } from '../dom-like/child-node/node-remove';

export function removeNodeChildren(
  parentNode: Node,
): void {
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    nodeRemove(firstChild);
  }
}

