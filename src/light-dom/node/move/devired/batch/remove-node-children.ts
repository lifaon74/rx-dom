import { getFirstChild } from '../../../properties';
import { nodeRemove } from '../dom-like';

export function removeNodeChildren(
  parentNode: Node,
): void {
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    nodeRemove(firstChild);
  }
}

