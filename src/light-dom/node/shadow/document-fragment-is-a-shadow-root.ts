import { isElementNode } from '../type';

export function documentFragmentIsAShadowRoot(
  node: DocumentFragment,
): node is ShadowRoot {
  return ('host' in node)
    && isElementNode((node as ShadowRoot).host);
}
