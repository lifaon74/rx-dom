import { getDocument } from './get-document';

export function getBaseURI(): string {
  return getDocument().baseURI;
}

