import { getElementStyleDeclaration } from './get-element-style-declaration';
import { IStylePropertyObjectWithOptionalPriority } from '../types/style-property-object.type';
import { setStylePropertyObject } from '../style-declaration/set-style-property-object';

export function setStylePropertyObjectOfElement(
  element: HTMLElement,
  name: string,
  property: IStylePropertyObjectWithOptionalPriority,
): void {
  setStylePropertyObject(getElementStyleDeclaration(element), name, property);
}
