import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { ISubscribeFunction } from '@lifaon/rx-js-light';


export function setReactiveClass(
  subscribe: ISubscribeFunction<boolean>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: boolean) => {
    element.classList.toggle(name, value);
  });
}

