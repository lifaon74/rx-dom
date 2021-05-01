import { isDetachNodeUseful } from './is-detach-node-useful';
import { detachNodeHavingParent } from './derived/detach-node-having-parent';

// TODO verify for shadow root and document fragment
export function detachNode(
  node: Node,
): void {
  if (isDetachNodeUseful(node)) {
    detachNodeHavingParent(node);
  }
}
