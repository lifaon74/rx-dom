import { createDocumentFragment } from '../../../../create';
import { getFirstChild, IParentNode } from '../../../../properties';
import { dispatchNodeAttached } from '../attach-node-with-event';
import { attachNode } from '../../attach-node';

export function detachStandardParentNodeChildrenIntoDocumentFragment(
  parentNode: IParentNode,
): DocumentFragment {
  const fragment: DocumentFragment = createDocumentFragment();
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    dispatchNodeAttached(firstChild, false);
    attachNode(firstChild, fragment, null);
  }
  return fragment;
}
