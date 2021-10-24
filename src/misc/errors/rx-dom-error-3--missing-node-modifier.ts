import { createRXDOMError } from './create-rx-dom-error';

export function createMissingNodeModifierRXDOMError(
  name: string,
): Error {
  return createRXDOMError(3, `Missing node modifier: '${name}'`);
}
