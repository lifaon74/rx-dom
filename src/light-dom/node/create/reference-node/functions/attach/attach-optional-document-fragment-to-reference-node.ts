import { IDocumentFragmentOrNull } from '../../../../type/document-fragment-or-null.type';
import { IReferenceNodeChildren } from '../../reference-node-children.type';
import { IReferenceNode } from '../../reference-node.type';
import { attachDocumentFragmentToReferenceNode } from './attach-document-fragment-to-reference-node';

export function attachOptionalDocumentFragmentToReferenceNode(
  fragment: IDocumentFragmentOrNull,
  referenceNode: IReferenceNode,
): IReferenceNodeChildren {
  if (fragment === null) {
    return [];
  } else {
    return attachDocumentFragmentToReferenceNode(fragment, referenceNode);
  }
}
