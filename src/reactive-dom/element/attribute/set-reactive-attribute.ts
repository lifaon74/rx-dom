import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { setAttributeValueWithEvent } from '../../../light-dom/attribute/with-event/set-attribute-value-with-event';
import { IAttributeValue } from '../../../light-dom/attribute/set-attribute-value';
import { ISubscribeFunction } from '@lifaon/rx-js-light';

export type IReactiveAttributeValue = IAttributeValue;

export function setReactiveAttribute(
  subscribe: ISubscribeFunction<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveAttributeValue) => {
    setAttributeValueWithEvent(element, name, value);
  });
}

