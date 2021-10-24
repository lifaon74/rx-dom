import { getElementClassList } from './get-element-class-list';

export function setCSSClass(
  element: Element,
  name: string,
  enabled: boolean,
): void {
  getElementClassList(element).toggle(name, enabled);
}

