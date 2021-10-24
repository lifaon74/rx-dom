import { nodeRemoveChild } from '../../node';
import { patchObjectMethod } from '../helpers/patch-object-method';

export function patchNodeRemoveChild(): void {
  patchObjectMethod(Node.prototype, 'removeChild', function <T extends Node>(this: Node, oldChild: T): T {
    return nodeRemoveChild<T>(this, oldChild);
  });
}
