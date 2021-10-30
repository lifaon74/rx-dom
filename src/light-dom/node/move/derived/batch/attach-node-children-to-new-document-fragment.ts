import { createDocumentFragment } from '../../../create/create-document-fragment';
import { getFirstChild } from '../../../properties/get-first-child';
import { IParentNode } from '../../../properties/get-parent-node';
import { attachStandardNodeUnsafe } from '../../node/attach/derived/standard/attach-standard-node-unsafe';

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
