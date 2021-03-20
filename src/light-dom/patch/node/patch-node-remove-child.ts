import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeRemoveChild } from '../../node';


export function patchNodeRemoveChild(): void {
  patchObjectMethod(Node.prototype, 'removeChild', function <T extends Node>(this: Node, oldChild: T): T {
    return nodeRemoveChild<T>(this, oldChild);
  });
}
