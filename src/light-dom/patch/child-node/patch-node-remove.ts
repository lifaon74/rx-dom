import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeRemove } from '../../node';
import { DEFAULT_CHILD_NODE_CONSTRUCTORS } from './child-node-constructors.constant';
import { ChildNodeConstructor } from '../../types/child-node-constructor.type';

export function patchNodeRemove(
  constructors: ArrayLike<ChildNodeConstructor> = DEFAULT_CHILD_NODE_CONSTRUCTORS,
): void {
  for (let i = 0, l = constructors.length; i < l; i++) {
    patchObjectMethod(constructors[i].prototype as ChildNode, 'remove', function (this: ChildNode): void {
      return nodeRemove(this);
    });
  }
}


