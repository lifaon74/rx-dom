import { IAttributeValue } from './attribute-value.type';

export function setAttribute(
  element: Element,
  name: string,
  value: IAttributeValue,
): void {
  element.setAttribute(name, value);
}

