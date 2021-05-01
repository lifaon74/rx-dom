import { isAttachDocumentFragmentUseful } from './is-attach-document-fragment-useful';
import { attachDocumentFragmentUnsafe } from './attach-document-fragment-unsafe';


export function attachDocumentFragment(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  if (isAttachDocumentFragmentUseful(fragment, parentNode, referenceNode)) {
    attachDocumentFragmentUnsafe(fragment, parentNode, referenceNode);
  }
}


