import { getElementStyleDeclaration } from './get-element-style-declaration';
import { IStylePropertyObject } from './style-property.type';

export function getStylePropertyObject(
  element: HTMLElement,
  name: string,
): IStylePropertyObject {
  return {
    value: getElementStyleDeclaration(element).getPropertyValue(name),
    priority: getElementStyleDeclaration(element).getPropertyPriority(name),
  };
}

