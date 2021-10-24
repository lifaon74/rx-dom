import { getFirstChild } from '../../../../../properties/get-first-child';
import { getLastChild } from '../../../../../properties/get-last-child';
import { getNextSibling } from '../../../../../properties/get-next-sibling';
import { dispatchNodePositionChange } from '../../../on-node-position-change-listener';
import { attachNodeRaw } from '../../attach-node-raw';

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
