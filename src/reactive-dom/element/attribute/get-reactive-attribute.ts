import { IEmitFunction } from '@lifaon/rx-js-light';
import { IReactiveAttributeValue } from './reactive-attribute-value.type';
import { onAttributeChangeListener } from '../../../light-dom';
import { subscribeOnNodeConnectedTo } from '../../../misc';

export function getReactiveAttribute(
  emit: IEmitFunction<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, onAttributeChangeListener(element, name), emit);
}
