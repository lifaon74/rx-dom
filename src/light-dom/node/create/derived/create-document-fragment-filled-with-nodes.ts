import { attachNode } from '../../move/node/attach/attach-node';
import { createDocumentFragment } from '../create-document-fragment';

export function createDocumentFragmentFilledWithNodes(
  nodes: ArrayLike<Node>,
  doc?: Document,
): DocumentFragment {
  const fragment: DocumentFragment = createDocumentFragment(doc);
  for (let i = 0, l = nodes.length; i < l; i++) {
    attachNode(nodes[i], fragment, null);
  }
  return fragment;
}



