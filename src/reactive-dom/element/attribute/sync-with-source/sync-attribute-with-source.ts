import { IGenericFunction, ISource } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../../../../light-dom/attribute/attribute-value.type';
import { getAttributeValue } from '../../../../light-dom/attribute/get-attribute-value';
import {
  onAttributeChangeListener,
  setAttributeValueWithEvent,
} from '../../../../light-dom/attribute/with-event/set-attribute-value-with-event';

export interface ISyncAttributeWithSourceOptions {
  // syncImmediately?: 'no' | 'exclude-null' | 'include-null'; // (default: 'exclude-null')
  syncImmediately?: boolean; // (default: true)
}

export function syncAttributeWithSource(
  source: ISource<IAttributeValueOrNull>,
  element: Element,
  name: string,
  {
    syncImmediately = true,
  }: ISyncAttributeWithSourceOptions = {},
): void {
  let isDispatching: boolean = false;

  const dispatch = (
    callback: IGenericFunction,
  ) => {
    if (!isDispatching) {
      isDispatching = true;
      callback();
      isDispatching = false;
    }
  };

  source.subscribe((value: IAttributeValueOrNull) => {
    dispatch(() => {
      setAttributeValueWithEvent(element, name, value);
    });
  });

  onAttributeChangeListener(element, name)((value: IAttributeValueOrNull) => {
    dispatch(() => {
      source.emit(value);
    });
  });

  if (syncImmediately) {
    dispatch(() => {
      source.emit(getAttributeValue(element, name));
    });
  }
}


