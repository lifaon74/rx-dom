import { isDocumentFragment } from '../../../../type';
import { attachNode } from '../../attach-node';
import { getParentNode } from '../../../../properties';
import { attachNodeWithEvent, dispatchNodeAttached } from '../attach-node-with-event';
import { moveNodeWithEvent } from '../move-node-with-event';
import { isNonShadowRootDocumentFragment } from '../../../../shadow';

export function attachStandardNode<GNode extends Node>(
  node: Node,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  const currentParentNode: Node | null = getParentNode(node);
  if ((currentParentNode === null) || isNonShadowRootDocumentFragment(currentParentNode)) { // (standard#frag|none# -> X)
    attachStandardNodeWithoutParentOrWithDocumentFragmentParent(node, parentNode, referenceNode);
  } else { // (standard#standard# -> X)
    attachStandardNodeWithStandardParent(node, parentNode, referenceNode);
  }
}


/**
 * Attaches a STANDARD Node having no parent of having a document fragment as parent
 * => dispatching 'detach' is not required
 * => dispatches 'attach' only if 'parentNode' is not a fragment
 */
export function attachStandardNodeWithoutParentOrWithDocumentFragmentParent<GNode extends Node>(
  node: Node,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  if (isNonShadowRootDocumentFragment(parentNode)) { // (standard#frag|none# -> frag)
    attachNode(node, parentNode, referenceNode);
  } else { // (standard#frag|none# -> standard)
    attachNodeWithEvent(node as unknown as ChildNode, parentNode, referenceNode);
  }
}


/**
 * Attaches a STANDARD Node having STANDARD parent
 * => dispatching 'detach' (with 'move' if 'parentNode' is a STANDARD node)
 * => dispatches 'attach' only if 'parentNode' is not a fragment
 */
export function attachStandardNodeWithStandardParent<GNode extends Node>(
  node: Node,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  if (isNonShadowRootDocumentFragment(parentNode)) { // (standard#standard# -> frag)
    dispatchNodeAttached(node, false);
    attachNode(node, parentNode, referenceNode);
  } else { // (standard#standard# -> standard)
    moveNodeWithEvent(node as unknown as ChildNode, parentNode, referenceNode);
  }
}
