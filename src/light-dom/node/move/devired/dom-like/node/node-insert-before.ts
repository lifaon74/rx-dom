import { isDocumentFragment } from '../../../../type/is-document-fragment';
import { attachNodeWithEvent } from '../../../node/__with-event/attach-node-with-event';
import { attachDocumentFragmentToStandardNode } from '../../../node/__with-event/derived/attach-document-fragment-to-standard-node';
import { moveNodeWithEvent } from '../../../node/__with-event/move-node-with-event';
import { isChildNode } from '../../../../state/is-child-node';
import { attachNode } from '../../../node/attach-node';
import { detachNodeWithEvent } from '../../../node';
import { getParentNode } from '../../../../properties';
import { attachDocumentFragment } from '../../../node/__with-event/derived/attach-document-fragment';
import { attachStandardNode } from '../../../node/__with-event/derived/attach-standard-node';

/**
 * Equivalent of:
 *  parentNode.insertBefore<T extends Node>(node: T, referenceNode: Node | null): T;
 */
export function nodeInsertBefore<GNode extends Node>(
  parentNode: Node,
  node: GNode,
  referenceNode: Node | null,
): GNode {
  if (isDocumentFragment(node)) { // (frag#none# -> X)
    attachDocumentFragment(node, parentNode, referenceNode);
  } else { // (standard#parent# -> X)
    attachStandardNode(node, parentNode, referenceNode);
  }
  return node;
}
