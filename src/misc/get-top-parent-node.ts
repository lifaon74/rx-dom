import { getDocumentBody } from '../light-dom/node/explore/get-document-body';

export function getTopParentNode(): Node {
  return getDocumentBody();
}

