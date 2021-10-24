import { HTMLElementConstructor } from '../types';
import { getCustomElementRegistry } from './get-custom-element-registry';

export function defineCustomElement(
  name: string,
  elementConstructor: HTMLElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  getCustomElementRegistry().define(name, elementConstructor, options);
}
