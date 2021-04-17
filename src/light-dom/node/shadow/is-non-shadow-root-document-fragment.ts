import { isDocumentFragment } from '../type';
import { documentFragmentIsAShadowRoot } from './document-fragment-is-a-shadow-root';

export function isNonShadowRootDocumentFragment(
  node: Node,
): node is DocumentFragment {
  return isDocumentFragment(node)
    && !documentFragmentIsAShadowRoot(node);
}

