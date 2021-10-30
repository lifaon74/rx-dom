import { HTMLElementConstructor } from '../types/html-element-constructor.type';
import { getCustomElementRegistry } from './get-custom-element-registry';

export function getCustomElementConstructorFromTagName<GElementConstructor extends HTMLElementConstructor>(
  tagName: string,
): GElementConstructor | undefined {
  return getCustomElementRegistry().get(tagName) as GElementConstructor | undefined;
}
