import { nodeInsertBefore } from '../../node';
import { patchObjectMethod } from '../helpers/patch-object-method';

export function patchNodeInsertBefore(): void {
  patchObjectMethod(Node.prototype, 'insertBefore', function <T extends Node>(this: Node, newChild: T, refChild: Node | null): T {
    return nodeInsertBefore<T>(this, newChild, refChild);
  });
}


