import { getElementStyleDeclaration } from './get-element-style-declaration';

export function removeStyleProperty(
  element: HTMLElement,
  name: string,
): void {
  getElementStyleDeclaration(element).removeProperty(name);
}
