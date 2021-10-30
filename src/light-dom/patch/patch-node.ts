import { patchNodeAfter } from './child-node/patch-node-after';
import { patchNodeBefore } from './child-node/patch-node-before';
import { patchNodeRemove } from './child-node/patch-node-remove';
import { patchNodeReplaceWith } from './child-node/patch-node-replace-with';
import { patchNodeAppendChild } from './node/patch-node-append-child';
import { patchNodeInsertBefore } from './node/patch-node-insert-before';
import { patchNodeRemoveChild } from './node/patch-node-remove-child';
import { patchNodeReplaceChild } from './node/patch-node-replace-child';
import { patchNodeAppend } from './parent-node/patch-node-append';
import { patchNodePrepend } from './parent-node/patch-node-prepend';

// TODO current 'patching' seems not optimal:
// some loops / incoherence may append due to the usage of insertBefore for attachNode
export function patchNode(): void {
  // child node
  patchNodeAfter();
  patchNodeBefore();
  patchNodeRemove();
  patchNodeReplaceWith();

  // node
  patchNodeAppendChild();
  patchNodeInsertBefore();
  patchNodeRemoveChild();
  patchNodeReplaceChild();

  // parent node
  patchNodeAppend();
  patchNodePrepend();

  // TODO patch innerHTML
}


