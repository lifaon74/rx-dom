import { nodeAppendChild } from '../dom-like';
import { getFirstChild } from '../../../properties';
import { createDocumentFragment } from '../../../create';

export function nodeMoveChildrenToDocumentFragment(
  parentNode: Node,
): DocumentFragment {
  const fragment: DocumentFragment = createDocumentFragment();
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    nodeAppendChild(fragment, firstChild);
  }
  return fragment;
}

