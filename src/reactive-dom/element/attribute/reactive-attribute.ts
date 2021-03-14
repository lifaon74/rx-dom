import { ISource } from '@lifaon/rx-js-light';
import { IReactiveAttributeValue } from './reactive-attribute-value.type';
import { getReactiveAttribute } from './get-reactive-attribute';
import { setReactiveAttribute } from './set-reactive-attribute';

export function reactiveAttribute(
  source: ISource<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  setReactiveAttribute(source.subscribe, element, name);
  getReactiveAttribute(source.emit, element, name);
}
