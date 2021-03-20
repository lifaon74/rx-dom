import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { extractUnit, IStylePropertyAndUnitTuple } from './functions/extract-styles';
import { ISubscribeFunction } from '@lifaon/rx-js-light';

export type IDynamicStyleValue = string | number | null;

export function setReactiveStyle(
  subscribe: ISubscribeFunction<IDynamicStyleValue>,
  element: HTMLElement,
  name: string,
): void {
  const [
    propertyName,
    unit
  ]: IStylePropertyAndUnitTuple = extractUnit(name);

  subscribeOnNodeConnectedTo(element, subscribe, (value: IDynamicStyleValue) => {
    if (value === null) {
      element.style.removeProperty(propertyName);
    } else {
      value = String(value);
      element.style.setProperty(
        propertyName,
        (unit === null)
          ? value
          : (value + unit)
      );
    }
  });
}

