import { isDocumentFragment } from '../../../../type';
import { attachNode } from '../../attach-node';
import { attachDocumentFragmentToStandardNode } from './attach-document-fragment-to-standard-node';

/**
 * Attaches a document fragment to a Node (fragment or not)
 * => dispatching 'detach' is not required
 * => dispatching 'attach' is only required if 'parentNode' is not a fragment, and only for the children
 */
export function attachDocumentFragment<GNode extends Node>(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  if (isDocumentFragment(parentNode)) { // (frag -> frag)
    attachNode(fragment, parentNode, referenceNode);
  } else { // (frag -> standard)
    attachDocumentFragmentToStandardNode(fragment, parentNode, referenceNode);
  }
}
