import { createCommentNode } from '../create-comment-node';
import { createTextNode } from '../create-text-node';
import { IReferenceNode } from './reference-node.type';

export function createReferenceNode(
  name: string,
  transparent: boolean = false,
): IReferenceNode {
  return transparent
    ? createTextNode()
    : createCommentNode(name);
}

