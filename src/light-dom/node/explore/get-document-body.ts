import { getDocument } from './get-document';

export function getDocumentBody(): HTMLElement {
  return getDocument().body;
}
