import { nodeAfter } from '../../node/move/derived/dom-like/child-node/node-after';
import { ChildNodeConstructor } from '../../types/child-node-constructor.type';
import { patchObjectMethod } from '../helpers/patch-object-method';
import { DEFAULT_CHILD_NODE_CONSTRUCTORS } from './child-node-constructors.constant';

export function patchNodeAfter(
  constructors: ArrayLike<ChildNodeConstructor> = DEFAULT_CHILD_NODE_CONSTRUCTORS,
): void {
  for (let i = 0, l = constructors.length; i < l; i++) {
    patchObjectMethod(constructors[i].prototype as ChildNode, 'after', function(this: ChildNode, ...nodes: (Node | string)[]): void {
      return nodeAfter(this, nodes);
    });
  }
}


