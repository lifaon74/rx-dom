import { createRXDOMError } from './create-rx-dom-error';

export function createMissingTagNameForComponentRXDOMError(
  index: number,
): Error {
  return createRXDOMError(2, `Missing 'TAG_NAME' for component at index #${index}`);
}

