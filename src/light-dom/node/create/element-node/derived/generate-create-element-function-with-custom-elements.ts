import { HTMLElementConstructor } from '../../../../types';
import { createElement, ICreateElementFunction, ICreateElementOptions } from '../create-element';


const FAKE_SET = new WeakSet<any>();

export function generateCreateElementFunctionWithCustomElements(
  customElements: ArrayLike<HTMLElementConstructor>,
  createElementFunction: ICreateElementFunction = createElement,
): ICreateElementFunction {
  FAKE_SET.add(customElements);
  return (
    tagName: string,
    options?: ICreateElementOptions,
  ): Element => {
    return createElementFunction(tagName, options);
  };
}
