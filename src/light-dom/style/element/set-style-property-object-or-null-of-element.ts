import { getElementStyleDeclaration } from './get-element-style-declaration';
import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../types/style-property-object.type';
import { setStylePropertyObjectOrNull } from '../style-declaration/set-style-property-object-or-null';

export function setStylePropertyObjectOrNullOfElement(
  element: HTMLElement,
  name: string,
  property: IStylePropertyObjectWithOptionalPriorityOrNull,
): void {
  setStylePropertyObjectOrNull(getElementStyleDeclaration(element), name, property);
}
