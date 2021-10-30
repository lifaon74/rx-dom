import { nodeBefore } from '../../node/move/derived/dom-like/child-node/node-before';
import { ChildNodeConstructor } from '../../types/child-node-constructor.type';
import { patchObjectMethod } from '../helpers/patch-object-method';
import { DEFAULT_CHILD_NODE_CONSTRUCTORS } from './child-node-constructors.constant';

export function patchNodeBefore(
  constructors: ArrayLike<ChildNodeConstructor> = DEFAULT_CHILD_NODE_CONSTRUCTORS,
): void {
  for (let i = 0, l = constructors.length; i < l; i++) {
    patchObjectMethod(constructors[i].prototype as ChildNode, 'before', function(this: ChildNode, ...nodes: (Node | string)[]): void {
      return nodeBefore(this, nodes);
    });
  }
}


