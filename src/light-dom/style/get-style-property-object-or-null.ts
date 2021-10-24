import { getStylePropertyObject } from './get-style-property-object';
import { IStylePropertyObject, IStylePropertyObjectOrNull } from './style-property.type';

export function getStylePropertyObjectOrNull(
  element: HTMLElement,
  name: string,
): IStylePropertyObjectOrNull {
  const property: IStylePropertyObject = getStylePropertyObject(element, name);
  return (property.value === '')
    ? null
    : property;
}

