import { attachStandardNodeUnsafe } from './attach-standard-node-unsafe';
import { isAttachStandardNodeUseful } from './is-attach-standard-node-useful';


export function attachStandardNode(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  if (isAttachStandardNodeUseful(node, parentNode, referenceNode)) {
    attachStandardNodeUnsafe(node, parentNode, referenceNode);
  }
}
