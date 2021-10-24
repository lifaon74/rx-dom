import { setStyleProperty } from './set-style-property';
import { IStylePropertyObjectWithOptionalPriority } from './style-property.type';

export function setStylePropertyObject(
  element: HTMLElement,
  name: string,
  {
    value,
    priority,
  }: IStylePropertyObjectWithOptionalPriority,
): void {
  setStyleProperty(element, name, value, priority);
}
