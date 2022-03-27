import { IObservable } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { searchCaseInsensitivePropertyOrThrow } from './search-case-insensitive-property';

export function setReactiveProperty<GPropertyValue>(
  subscribe: IObservable<GPropertyValue>,
  node: Node,
  propertyKey: PropertyKey,
): void {
  subscribeOnNodeConnectedTo(node, subscribe, (value: GPropertyValue): void => {
    node[propertyKey] = value;
  });
}

export function setCaseInsensitiveReactiveProperty(
  subscribe: IObservable<any>,
  node: Node,
  propertyKey: PropertyKey,
): void {
  return setReactiveProperty(
    subscribe,
    node,
    searchCaseInsensitivePropertyOrThrow(propertyKey, node),
  );
}
