import { IObservable } from '@lifaon/rx-js-light';
import { setCSSClass } from '../../../light-dom/class/set-css-class';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export function setReactiveClass(
  subscribe: IObservable<boolean>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: boolean): void => {
    setCSSClass(element, name, value);
  });
}

