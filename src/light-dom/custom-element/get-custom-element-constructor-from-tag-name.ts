import { HTMLElementConstructor } from '../types';
import { getCustomElementRegistry } from './get-custom-element-registry';

export function getCustomElementConstructorFromTagName<GElementConstructor extends HTMLElementConstructor>(
  tagName: string,
): GElementConstructor | undefined {
  return getCustomElementRegistry().get(tagName) as GElementConstructor | undefined;
}
