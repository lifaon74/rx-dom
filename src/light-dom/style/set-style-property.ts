import { getElementStyleDeclaration } from './get-element-style-declaration';
import { IStylePropertyPriority, IStylePropertyValue } from './style-property.type';

export function setStyleProperty(
  element: HTMLElement,
  name: string,
  value: IStylePropertyValue,
  priority?: IStylePropertyPriority,
): void {
  getElementStyleDeclaration(element).setProperty(name, value, priority);
}


