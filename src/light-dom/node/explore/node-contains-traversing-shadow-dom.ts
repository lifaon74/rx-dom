import { isShadowRoot } from '../shadow';
import { getParentNode, getShadowRootHost } from '../properties';

export function nodeContainsTraversingShadowDOM(
  parentNode: Node,
  childNode: Node,
): boolean {
  while (true) {
    const _parentNode: Node | null = isShadowRoot(childNode)
      ? getShadowRootHost(childNode)
      : getParentNode(childNode);

    if (_parentNode === null) {
      return false;
    } else if (_parentNode === parentNode) {
      return true;
    } else {
      childNode = _parentNode;
    }
  }
}
