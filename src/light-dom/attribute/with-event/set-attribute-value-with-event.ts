import { createListenerBuilderFunctions, createListenerMap, freeze, ISubscribeFunction } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../attribute-value.type';
import { getAttributeValue } from '../get-attribute-value';
import { setAttributeValue } from '../set-attribute-value';

const ATTRIBUTE_REFERENCE_STORE = new WeakMap<Element, Map<string, IAttributeReference>>();

export interface IAttributeReference {
  readonly element: Element;
  readonly name: string;
}

export function generateAttributeReference(
  element: Element,
  name: string,
): IAttributeReference {
  let map: Map<string, IAttributeReference>;
  if (ATTRIBUTE_REFERENCE_STORE.has(element)) {
    map = ATTRIBUTE_REFERENCE_STORE.get(element) as Map<string, IAttributeReference>;
  } else {
    map = new Map<string, IAttributeReference>();
    ATTRIBUTE_REFERENCE_STORE.set(element, map);
  }

  if (map.has(name)) {
    return map.get(name) as IAttributeReference;
  } else {
    const reference: IAttributeReference = freeze({
      element,
      name,
    });
    map.set(name, reference);
    return reference;
  }
}

/*---*/

const ON_ATTRIBUTE_CHANGE_LISTENERS = createListenerMap<IAttributeReference, IAttributeValueOrNull>();

export const {
  listener: onAttributeReferenceChangeListener,
  dispatch: dispatchAttributeReferenceChange,
} = createListenerBuilderFunctions(ON_ATTRIBUTE_CHANGE_LISTENERS);

/*---*/

export function onAttributeChangeListener(
  element: Element,
  name: string,
): ISubscribeFunction<IAttributeValueOrNull> {
  return onAttributeReferenceChangeListener(generateAttributeReference(element, name));
}

export function dispatchAttributeChange(
  element: Element,
  name: string,
  value: IAttributeValueOrNull,
): void {
  return dispatchAttributeReferenceChange(generateAttributeReference(element, name), value);
}

export function setAttributeValueWithEvent(
  element: Element,
  name: string,
  value: IAttributeValueOrNull,
): void {
  if (getAttributeValue(element, name) !== value) {
    setAttributeValue(element, name, value);
    dispatchAttributeChange(element, name, value);
  }
}

