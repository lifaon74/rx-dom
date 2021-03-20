import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeReplaceChild } from '../../node';


export function patchNodeReplaceChild(): void {
  patchObjectMethod(Node.prototype, 'replaceChild', function <T extends Node>(this: Node, newChild: Node, oldChild: T): T {
    return nodeReplaceChild<T>(this, newChild, oldChild);
  });
}
