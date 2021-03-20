import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeAfter } from '../../node';
import { DEFAULT_CHILD_NODE_CONSTRUCTORS } from './child-node-constructors.constant';
import { ChildNodeConstructor } from '../../types/child-node-constructor.type';

export function patchNodeAfter(
  constructors: ArrayLike<ChildNodeConstructor> = DEFAULT_CHILD_NODE_CONSTRUCTORS,
): void {
  for (let i = 0, l = constructors.length; i < l; i++) {
    patchObjectMethod(constructors[i].prototype as ChildNode, 'after', function (this: ChildNode, ...nodes: (Node | string)[]): void {
      return nodeAfter(this, nodes);
    });
  }
}


