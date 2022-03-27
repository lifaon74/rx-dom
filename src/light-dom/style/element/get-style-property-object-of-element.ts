import { getElementStyleDeclaration } from './get-element-style-declaration';
import { getStylePropertyObject } from '../style-declaration/get-style-property-object';
import { IStylePropertyObject } from '../types/style-property-object.type';

export function getStylePropertyObjectOfElement(
  element: HTMLElement,
  name: string,
): IStylePropertyObject {
  return getStylePropertyObject(getElementStyleDeclaration(element), name);
}

