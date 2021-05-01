import { getLastChild, getParentNode, getPreviousSibling } from '../../../../../properties';

/**
 * Returns true if attaching 'node' before 'referenceNode' creates a change
 */
export function isAttachStandardNodeUseful(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): boolean {
  return (parentNode !== getParentNode(node))
    || ( // parentNode === node.parentNode => node is only moving
      (referenceNode === null)
        ? (node !== getLastChild(parentNode))
        : (
          (node !== referenceNode)
          && (node !== getPreviousSibling(referenceNode))
        )
    )
    ;
}

