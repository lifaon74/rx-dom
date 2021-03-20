import { patchObjectMethod } from '../helpers/patch-object-method';
import { nodeAppend } from '../../node';
import { ParentNodeConstructor } from '../../types/parent-node-constructor.type';
import { DEFAULT_PARENT_NODE_CONSTRUCTORS } from './parent-node-constructors.constant';

export function patchNodeAppend(
  constructors: ArrayLike<ParentNodeConstructor> = DEFAULT_PARENT_NODE_CONSTRUCTORS,
): void {
  for (let i = 0, l = constructors.length; i < l; i++) {
    patchObjectMethod(constructors[i].prototype as (ParentNode & Node), 'append', function (this: ParentNode & Node, ...nodes: (Node | string)[]): void {
      return nodeAppend(this, nodes);
    });
  }
}


