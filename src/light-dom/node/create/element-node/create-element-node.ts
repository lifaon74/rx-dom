import { getDocument } from '../../explore';

export interface ICreateElementNodeOptions {
  document?: Document;
  elementOptions?: ElementCreationOptions,
}

export function createElementNode<GTagName extends keyof HTMLElementTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementNodeOptions,
): HTMLElementTagNameMap[GTagName];
export function createElementNode<GTagName extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementNodeOptions,
): HTMLElementDeprecatedTagNameMap[GTagName];
export function createElementNode<GElement extends Element>(
  tagName: string,
  options?: ICreateElementNodeOptions,
): GElement;
export function createElementNode(
  tagName: string,
  {
    document = getDocument(),
    elementOptions,
  }: ICreateElementNodeOptions = {},
): Element {
  return document.createElement(tagName, elementOptions);
}

