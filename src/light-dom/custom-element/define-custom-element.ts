import { HTMLElementConstructor } from '../types/html-element-constructor.type';
import { getCustomElementRegistry } from './get-custom-element-registry';

export function defineCustomElement(
  name: string,
  elementConstructor: HTMLElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  getCustomElementRegistry().define(name, elementConstructor, options);
}
