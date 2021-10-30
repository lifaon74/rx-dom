import { nodeRemoveChild } from '../../node/move/derived/dom-like/node/node-remove-child';
import { patchObjectMethod } from '../helpers/patch-object-method';

export function patchNodeRemoveChild(): void {
  patchObjectMethod(Node.prototype, 'removeChild', function <T extends Node>(this: Node, oldChild: T): T {
    return nodeRemoveChild<T>(this, oldChild);
  });
}
