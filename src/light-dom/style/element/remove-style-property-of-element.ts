import { getElementStyleDeclaration } from './get-element-style-declaration';
import { removeStyleProperty } from '../style-declaration/remove-style-property';

export function removeStylePropertyOfElement(
  element: HTMLElement,
  name: string,
): void {
  removeStyleProperty(getElementStyleDeclaration(element), name);
}
