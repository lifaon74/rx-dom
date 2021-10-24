import { isDocumentFragment } from '../type/is-document-fragment';
import { documentFragmentIsAShadowRoot } from './document-fragment-is-a-shadow-root';

export function isShadowRoot(
  node: Node,
): node is ShadowRoot {
  return isDocumentFragment(node)
    && documentFragmentIsAShadowRoot(node);
}

