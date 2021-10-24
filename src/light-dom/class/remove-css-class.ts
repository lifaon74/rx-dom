import { getElementClassList } from './get-element-class-list';

export function removeCSSClass(
  element: Element,
  name: string,
): void {
  getElementClassList(element).remove(name);
}

