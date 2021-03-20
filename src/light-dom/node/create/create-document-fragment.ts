import { getDocument } from '../explore';

export function createDocumentFragment(
  doc: Document = getDocument(),
): DocumentFragment {
  return doc.createDocumentFragment();
}



