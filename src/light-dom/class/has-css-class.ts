import { getElementClassList } from './get-element-class-list';

export function hasCSSClass(
  element: Element,
  name: string,
): boolean {
  return getElementClassList(element).contains(name);
}

