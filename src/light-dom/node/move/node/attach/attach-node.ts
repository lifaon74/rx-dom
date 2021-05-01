import { isDocumentFragment } from '../../../type';
import { attachDocumentFragment } from './derived/fragment/attach-document-fragment';
import { attachStandardNode } from './derived/standard/attach-standard-node';


// INFO attaching a shadowRoot to an element is the exact same thing as attaching a documentFragment to this element
//  (put shadowRoot content into this element)

export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  if (isDocumentFragment(node)) {
    attachDocumentFragment(node, parentNode, referenceNode);
  } else {
    attachStandardNode(node, parentNode, referenceNode);
  }
}
