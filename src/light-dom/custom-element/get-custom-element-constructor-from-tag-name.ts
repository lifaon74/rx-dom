import { HTMLElementConstructor } from '../types';


export function getCustomElementConstructorFromTagName<GElementConstructor extends HTMLElementConstructor>(
  tagName: string,
): GElementConstructor | undefined {
  return customElements.get(tagName);
}
