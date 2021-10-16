import { createElement, ICreateElementFunction, ICreateElementOptions } from '../create-element';
import { createElementNode } from '../create-element-node';

/**
 * @deprecated
 */
export function generateCreateElementFunctionWithRouterOutlet(
  routerOutletTagName: string,
  createElementFunction: ICreateElementFunction = createElement,
): ICreateElementFunction {
  return (
    tagName: string,
    options?: ICreateElementOptions,
  ): Element => {
    return (tagName === routerOutletTagName)
      ? createElementNode(tagName)
      : createElementFunction(tagName, options);
  };
}
