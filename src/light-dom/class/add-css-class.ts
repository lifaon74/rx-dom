import { getElementClassList } from './get-element-class-list';

export function addCSSClass(
  element: Element,
  name: string,
): void {
  getElementClassList(element).add(name);
}

