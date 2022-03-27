import { attachDocumentFragment } from '../../../../move/node/attach/derived/fragment/attach-document-fragment';
import { getChildNodes } from '../../../../properties/get-child-nodes';
import { getNextSibling } from '../../../../properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';
import { IReferenceNodeChildren } from '../../reference-node-children.type';
import { IReferenceNode } from '../../reference-node.type';

export function attachDocumentFragmentToReferenceNode(
  fragment: DocumentFragment,
  referenceNode: IReferenceNode,
): IReferenceNodeChildren {
  const nodes: IReferenceNodeChildren = getChildNodes(fragment) as IReferenceNodeChildren;
  attachDocumentFragment(
    fragment,
    getParentNode(referenceNode) as IParentNode,
    getNextSibling(referenceNode),
  );
  return nodes;
}
