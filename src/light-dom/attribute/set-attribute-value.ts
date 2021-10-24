import { IAttributeValueOrNull } from './attribute-value.type';
import { removeAttribute } from './remove-attribute';
import { setAttribute } from './set-attribute';

export function setAttributeValue(
  element: Element,
  name: string,
  value: IAttributeValueOrNull,
): void {
  if (value === null) {
    removeAttribute(element, name);
  } else {
    setAttribute(element, name, value);
  }
}

