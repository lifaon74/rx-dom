export function removeStyleProperty(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
): void {
  styleDeclaration.removeProperty(name);
}

