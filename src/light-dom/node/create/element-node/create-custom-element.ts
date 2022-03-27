import { getCustomElementConstructorFromTagName } from '../../../custom-element/get-custom-element-constructor-from-tag-name';
import { createElement, ICreateElementOptions } from './create-element';

export function createCustomElement<GElement extends Element>(
  tagName: string,
  options?: ICreateElementOptions,
): GElement {
  const customElementName: string = ((options === void 0) || (options.is === void 0))
    ? tagName
    : options.is;

  if (getCustomElementConstructorFromTagName(customElementName) === void 0) {
    throw new Error(`Missing custom element: '${customElementName}'`);
  } else {
    return createElement(tagName, options);
  }
}
