import { createDocumentFragment } from '../create-document-fragment';
import { attachNode } from '../../move';


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



