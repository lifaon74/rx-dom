import { getShadowRootHost } from '../properties/get-shadow-root-host';
import { isElementNode } from '../type/is-element-node';

export function documentFragmentIsAShadowRoot(
  node: DocumentFragment,
): node is ShadowRoot {
  return ('host' in node)
    && isElementNode(getShadowRootHost(node as ShadowRoot));
}
