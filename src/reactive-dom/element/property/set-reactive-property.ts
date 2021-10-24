import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { searchCaseInsensitiveProperty } from './search-case-insensitive-property';

export function setReactiveProperty<GPropertyValue>(
  subscribe: ISubscribeFunction<GPropertyValue>,
  node: Node,
  name: string,
): void {
  subscribeOnNodeConnectedTo(node, subscribe, (value: GPropertyValue) => {
    node[name] = value;
  });
}

export function setCaseInsensitiveReactiveProperty(
  subscribe: ISubscribeFunction<any>,
  node: Node,
  name: string,
): void {
  const _name: string | null = searchCaseInsensitiveProperty(name, node);
  if (_name === null) {
    console.warn(node);
    throw new Error(`Missing property '${name}'`);
  }
  return setReactiveProperty(
    subscribe,
    node,
    _name,
  );
}
