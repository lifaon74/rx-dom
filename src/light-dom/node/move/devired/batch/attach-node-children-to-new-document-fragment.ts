import { createDocumentFragment } from '../../../create';
import { getFirstChild, IParentNode } from '../../../properties';
import { attachStandardNodeUnsafe } from '../../node';

export function attachNodeChildrenToNewDocumentFragment(
  parentNode: IParentNode,
): DocumentFragment {
  const fragment: DocumentFragment = createDocumentFragment();
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(parentNode)) !== null) {
    // TODO verify shadow root
    attachStandardNodeUnsafe(firstChild, fragment, null);
  }
  return fragment;
}
