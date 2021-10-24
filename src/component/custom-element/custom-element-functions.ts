import { defineCustomElement } from '../../light-dom/custom-element/define-custom-element';
import { HTMLElementConstructor } from '../../light-dom/types';
import { objectDefineProperty } from '../../misc/object-define-property';

/**
 * Returns the list of all the observedAttributes of a CustomElement
 */
export function getCustomElementObservedAttributes(
  target: HTMLElementConstructor,
  stopOnFirstMatch: boolean = true,
): Set<string> {
  const observedAttributes: Set<string> = new Set<string>();
  let superClass: any | null = target;

  while (superClass !== null) {
    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(superClass, 'observedAttributes');
    if (descriptor !== void 0) {
      let values: string[];
      if (descriptor.hasOwnProperty('value')) {
        values = descriptor.value;
      } else if (descriptor.hasOwnProperty('get')) {
        values = (descriptor.get as () => string[]).call(target);
      } else {
        throw new TypeError(`Expected 'value' or 'get' in descriptor for ${superClass.name}.observedAttributes`);
      }

      for (let i = 0, l = values.length; i < l; i++) {
        observedAttributes.add(values[i]);
      }

      if (stopOnFirstMatch) {
        break;
      }
    }
    superClass = Object.getPrototypeOf(superClass);
  }

  return observedAttributes;
}

export function updateObservedAttributes(
  target: HTMLElementConstructor,
  newObservedAttributes: Iterable<string>,
): void {
  const observedAttributes: Set<string> = getCustomElementObservedAttributes(target);

  const iterator: Iterator<string> = newObservedAttributes[Symbol.iterator]();
  let result: IteratorResult<string>;
  while (!(result = iterator.next()).done) {
    observedAttributes.add(result.value);
  }

  objectDefineProperty(target, 'observedAttributes', {
    value: Array.from(observedAttributes),
    writable: false,
    configurable: true,
    enumerable: true,
  });
}

export interface ICustomElementOptions extends ElementDefinitionOptions {
  name: string; // tag name
  observedAttributes?: Iterable<string>; // optional list of observed attributes
}

/**
 * Register a Custom HTMLElement:
 *  - builds a proper 'observedAttributes' static getter
 *  - infers proper 'extends' property
 *  - register the tag name to be available/usable into the html
 */
export function registerCustomElement(
  target: HTMLElementConstructor,
  options: ICustomElementOptions,
): void {
  // if observedAttributes is present, extracts static observedAttributes and remap the function
  if (options.observedAttributes !== void 0) {
    updateObservedAttributes(target, options.observedAttributes);
  }
  defineCustomElement(options.name, target, options);
}



