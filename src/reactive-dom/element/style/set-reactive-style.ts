import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { setStylePropertyObjectOrNull } from '../../../light-dom/style/set-style-property-object-or-null';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { dynamicStyleValueLikeToDynamicStyleValue, IDynamicStyleValueLike } from './functions';

// export type IDynamicStyleValue = IStylePropertyObjectWithOptionalPriorityOrNull;
//
// export function setReactiveStyle(
//   subscribe: ISubscribeFunction<IDynamicStyleValue>,
//   element: HTMLElement,
//   name: string,
// ): void {
//   subscribeOnNodeConnectedTo(element, subscribe, (value: IDynamicStyleValue) => {
//     setStylePropertyObjectOrNull(element, name, value);
//   });
// }

export type IDynamicStyleValue = IDynamicStyleValueLike;

export function setReactiveStyle(
  subscribe: ISubscribeFunction<IDynamicStyleValue>,
  element: HTMLElement,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IDynamicStyleValue): void => {
    setStylePropertyObjectOrNull(element, name, dynamicStyleValueLikeToDynamicStyleValue(value));
  });
}
