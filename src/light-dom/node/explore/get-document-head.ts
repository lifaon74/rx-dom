import { getDocument } from './get-document';

export function getDocumentHead(): HTMLHeadElement {
  return getDocument().head;
}
