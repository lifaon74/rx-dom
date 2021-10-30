import { getDocument } from '../explore/get-document';

export function createDocumentFragment(
  doc: Document = getDocument(),
): DocumentFragment {
  return doc.createDocumentFragment();
}



