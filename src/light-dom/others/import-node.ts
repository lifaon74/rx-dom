import { getDocument } from '../node/explore/get-document';

export function importNode<GNode extends Node>(
  importedNode: GNode,
  deep: boolean,
  doc: Document = getDocument(),
): GNode {
  return doc.importNode(importedNode, deep);
}

