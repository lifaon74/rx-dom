export function createRXDOMError(
  id: number,
  message: string,
): Error {
  return new Error(`rx-dom-err-${id} - ${message}`);
}
