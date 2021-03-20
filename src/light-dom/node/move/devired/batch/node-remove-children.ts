import { nodeRemove } from '../dom-like';
import { getFirstChild } from '../../../properties';

export function nodeRemoveChildren(
  parentNode: Node,
): void {
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    nodeRemove(firstChild);
  }
}

