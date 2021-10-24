import { createCommentNode } from '../create-comment-node';
import { createTextNode } from '../create-text-node';

export type IReferenceNode = Comment | Text;

export function createReferenceNode(
  name: string,
  transparent: boolean = false,
): IReferenceNode {
  return transparent
    ? createTextNode()
    : createCommentNode(name);
}

