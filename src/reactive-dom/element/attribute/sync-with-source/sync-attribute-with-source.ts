import { IGenericFunction, ISource } from '@lifaon/rx-js-light';
import {
  getAttributeValue, IAttributeValue, onAttributeChangeListener, setAttributeValueWithEvent
} from '../../../../light-dom';


export interface ISyncAttributeWithSourceOptions {
  // syncImmediately?: 'no' | 'exclude-null' | 'include-null'; // (default: 'exclude-null')
  syncImmediately?: boolean; // (default: true)
}

export function syncAttributeWithSource(
  source: ISource<IAttributeValue>,
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

  source.subscribe((value: IAttributeValue) => {
    dispatch(() => {
      setAttributeValueWithEvent(element, name, value);
    });
  });

  onAttributeChangeListener(element, name)((value: IAttributeValue) => {
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


