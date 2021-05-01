import { createRXDOMError } from './create-rx-dom-error';

export function createMissingComponentImportRXDOMError(
  tagName: string,
): Error {
  return createRXDOMError(1, `Missing component import: '${ tagName }'`);
}
