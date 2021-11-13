import { IObservable } from '@lifaon/rx-js-light';
import { setAttributeValueWithEvent } from '../../../light-dom/attribute/with-event/set-attribute-value-with-event';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { IReactiveAttributeValue } from './reactive-attribute-value.type';

export function setReactiveAttribute(
  subscribe: IObservable<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveAttributeValue) => {
    setAttributeValueWithEvent(element, name, value);
  });
}

