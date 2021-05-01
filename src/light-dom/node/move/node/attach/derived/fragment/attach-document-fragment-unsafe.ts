import { getFirstChild, getLastChild, getNextSibling } from '../../../../../properties';
import { attachNodeRaw } from '../../attach-node-raw';
import { dispatchNodePositionChange } from '../../../on-node-position-change-listener';

export function attachDocumentFragmentUnsafe(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  let node: ChildNode | null = getFirstChild(fragment);
  const lastChild: ChildNode | null = getLastChild(fragment);
  attachNodeRaw(fragment, parentNode, referenceNode);
  while (node !== null) {
    dispatchNodePositionChange(node, fragment);
    if (node === lastChild) {
      break;
    } else {
      node = getNextSibling(node);
    }
  }
}
