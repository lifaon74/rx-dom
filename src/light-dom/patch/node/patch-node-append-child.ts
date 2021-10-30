import { nodeAppendChild } from '../../node/move/derived/dom-like/node/node-append-child';
import { patchObjectMethod } from '../helpers/patch-object-method';

export function patchNodeAppendChild(): void {
  patchObjectMethod(Node.prototype, 'appendChild', function <T extends Node>(this: Node, newChild: T): T {
    return nodeAppendChild<T>(this, newChild);
  });
}


