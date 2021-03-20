import { patchNodeAfter, patchNodeBefore, patchNodeRemove, patchNodeReplaceWith } from './child-node';
import { patchNodeAppendChild, patchNodeInsertBefore, patchNodeRemoveChild, patchNodeReplaceChild } from './node';
import { patchNodeAppend, patchNodePrepend } from './parent-node';

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


