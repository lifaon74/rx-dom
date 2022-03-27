import { getElementStyleDeclaration } from './get-element-style-declaration';
import { IStylePropertyPriority, IStylePropertyValue } from '../types/style-property-object.type';
import { setStyleProperty } from '../style-declaration/set-style-property';

export function setStylePropertyOfElement(
  element: HTMLElement,
  name: string,
  value: IStylePropertyValue,
  priority?: IStylePropertyPriority,
): void {
  setStyleProperty(getElementStyleDeclaration(element), name, value, priority);
}
