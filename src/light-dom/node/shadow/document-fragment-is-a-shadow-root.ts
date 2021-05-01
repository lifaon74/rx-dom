import { isElementNode } from '../type';
import { getShadowRootHost } from '../properties/get-shadow-root-host';

export function documentFragmentIsAShadowRoot(
  node: DocumentFragment,
): node is ShadowRoot {
  return ('host' in node)
    && isElementNode(getShadowRootHost(node as ShadowRoot));
}
