import { getDocument } from '../node';

export function importNode<GNode extends Node>(
  importedNode: GNode,
  deep: boolean,
  doc: Document = getDocument(),
): GNode {
  return doc.importNode(importedNode, deep);
}

