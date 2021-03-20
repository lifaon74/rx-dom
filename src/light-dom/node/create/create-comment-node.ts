import { getDocument } from '../explore';

/**
 * Creates a Comment Node with a static value
 */
export function createCommentNode(
  value: string = '',
  doc: Document = getDocument(),
): Comment {
  return doc.createComment(value);
}
