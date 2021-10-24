import { IAttributeValueOrNull } from './attribute-value.type';

export function getAttributeValue(
  element: Element,
  name: string,
): IAttributeValueOrNull {
  return element.getAttribute(name);
}
