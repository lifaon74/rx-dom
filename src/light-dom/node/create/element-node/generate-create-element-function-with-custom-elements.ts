import { HTMLElementConstructor } from '../../../types';
import { createElement, ICreateElementOptions } from './create-element';

export type IGenerateCreateElementFunctionWithCustomElementsReturn = typeof createElement;

const FAKE_SET = new WeakSet<any>();

export function generateCreateElementFunctionWithCustomElements(
  customElements: ArrayLike<HTMLElementConstructor>,
): IGenerateCreateElementFunctionWithCustomElementsReturn {
  FAKE_SET.add(customElements);
  return (
    tagName: string,
    options?: ICreateElementOptions,
  ): Element => {
    return createElement(tagName, options);
  };
}
