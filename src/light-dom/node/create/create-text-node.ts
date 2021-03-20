import { getDocument } from '../explore';

/**
 * Creates a Text Node with a static value
 */
export function createTextNode(
  value: string = '',
  doc: Document = getDocument(),
): Text {
  return doc.createTextNode(value);
}
