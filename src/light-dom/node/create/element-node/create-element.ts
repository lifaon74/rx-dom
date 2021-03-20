import { createElementNode, ICreateElementNodeOptions } from './create-element-node';
import { isSVGElementTagName } from '../../../tags/is/is-svg-element-tag-name';
import { createElementNodeNS } from './create-element-node-ns';
import { isCustomElementTagName } from '../../../tags/is/is-custom-element-tag-name';
import { getCustomElementConstructorFromTagName } from '../../../custom-element';

export interface ICreateElementOptions extends ICreateElementNodeOptions {
}

export function createElement<GTagName extends keyof HTMLElementTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementOptions,
): HTMLElementTagNameMap[GTagName];
export function createElement<GTagName extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementOptions,
): HTMLElementDeprecatedTagNameMap[GTagName];
export function createElement<GTagName extends keyof SVGElementTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementOptions,
): SVGElementTagNameMap[GTagName];
export function createElement<GElement extends Element>(
  tagName: string,
  options?: ICreateElementOptions,
): GElement;
export function createElement(
  tagName: string,
  options?: ICreateElementOptions,
): Element {
  if (isSVGElementTagName(tagName)) {
    return createElementNodeNS('http://www.w3.org/2000/svg', tagName, options);
  } else if (isCustomElementTagName(tagName)) {
    if (getCustomElementConstructorFromTagName(tagName) === void 0) {
      throw new Error(`'${ tagName }' is not defined`);
    } else {
      return createElementNode(tagName, options);
    }
  } else {
    return createElementNode(tagName, options);
  }
}

