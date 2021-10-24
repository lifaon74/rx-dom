import { removeStyleProperty } from './remove-style-property';
import { setStylePropertyObject } from './set-style-property-object';
import { IStylePropertyObjectWithOptionalPriorityOrNull } from './style-property.type';

export function setStylePropertyObjectOrNull(
  element: HTMLElement,
  name: string,
  property: IStylePropertyObjectWithOptionalPriorityOrNull,
): void {
  if (property === null) {
    removeStyleProperty(element, name);
  } else {
    setStylePropertyObject(element, name, property);
  }
}
