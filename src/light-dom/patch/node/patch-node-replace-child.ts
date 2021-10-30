import { nodeReplaceChild } from '../../node/move/derived/dom-like/node/node-replace-child';
import { patchObjectMethod } from '../helpers/patch-object-method';

export function patchNodeReplaceChild(): void {
  patchObjectMethod(Node.prototype, 'replaceChild', function <T extends Node>(this: Node, newChild: Node, oldChild: T): T {
    return nodeReplaceChild<T>(this, newChild, oldChild);
  });
}
