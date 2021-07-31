export function isHTMLElement(
  node: any,
): node is HTMLElement {
  return (node instanceof HTMLElement);
}

