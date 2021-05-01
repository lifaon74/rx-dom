import { createElementNode, ICreateElementNodeOptions } from './create-element-node';
import { getCustomElementConstructorFromTagName } from '../../../custom-element';

export interface ICustomElementCreationWithIsOptions extends Omit<ElementCreationOptions, 'is'>, Required<Pick<ElementCreationOptions, 'is'>> {
}

export interface ICreateCustomElementNodeWithIsOptions extends Omit<ICreateElementNodeOptions, 'elementOptions'> {
  elementOptions: ICustomElementCreationWithIsOptions,
}

export function createCustomElementNodeWithIs<GElement extends Element>(
  tagName: string,
  options: ICreateCustomElementNodeWithIsOptions,
): GElement {
  return createCustomElementNode<GElement>(tagName, options.elementOptions.is, options);
}

export function createCustomElementNodeWithoutIs<GElement extends Element>(
  tagName: string,
  options?: ICreateElementNodeOptions,
): GElement {
  return createCustomElementNode<GElement>(tagName, tagName, options);
}


function createCustomElementNode<GElement extends Element>(
  tagName: string,
  is: string,
  options?: ICreateElementNodeOptions,
): GElement {
  if (getCustomElementConstructorFromTagName(is) === void 0) {
    throw new Error(`Missing custom element: '${ is }'`);
  } else {
    return createElementNode(tagName, options);
  }
}
