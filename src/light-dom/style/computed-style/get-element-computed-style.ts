export function getElementComputedStyle(
  element: Element,
  pseudoElement?: string | null,
): CSSStyleDeclaration {
  return getComputedStyle(
    element,
    pseudoElement,
  );
}
