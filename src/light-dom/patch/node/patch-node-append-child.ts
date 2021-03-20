import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeAppendChild } from '../../node';

export function patchNodeAppendChild(): void {
  patchObjectMethod(Node.prototype, 'appendChild', function <T extends Node>(this: Node, newChild: T): T {
    return nodeAppendChild<T>(this, newChild);
  });
}


