import { IObservable } from '@lifaon/rx-js-light';
import { setStylePropertyObjectOrNullOfElement } from '../../../light-dom/style/element/set-style-property-object-or-null-of-element';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import {
  IStylePropertyLike,
  stylePropertyLikeToStylePropertyObjectWithOptionalPriorityOrNull,
} from './functions/converters/style-property-like-converters';

// export type IDynamicStyleValue = IStylePropertyObjectWithOptionalPriorityOrNull;
//
// export function setReactiveStyle(
//   subscribe: IObservable<IDynamicStyleValue>,
//   element: HTMLElement,
//   name: string,
// ): void {
//   subscribeOnNodeConnectedTo(element, subscribe, (value: IDynamicStyleValue) => {
//     setStylePropertyObjectOrNull(element, name, value);
//   });
// }

export type IReactiveStyleValue = IStylePropertyLike;

export function setReactiveStyle(
  subscribe: IObservable<IReactiveStyleValue>,
  element: HTMLElement,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveStyleValue): void => {
    setStylePropertyObjectOrNullOfElement(element, name, stylePropertyLikeToStylePropertyObjectWithOptionalPriorityOrNull(value));
  });
}
