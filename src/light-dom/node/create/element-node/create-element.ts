import { getDocument } from '../../explore/get-document';

export interface ICreateElementOptions extends ElementCreationOptions {
  document?: Document;
}

export function createElement<GTagName extends keyof HTMLElementTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementOptions,
): HTMLElementTagNameMap[GTagName];
export function createElement<GTagName extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: GTagName,
  options?: ICreateElementOptions,
): HTMLElementDeprecatedTagNameMap[GTagName];
export function createElement<GElement extends Element>(
  tagName: string,
  options?: ICreateElementOptions,
): GElement;
export function createElement(
  tagName: string,
  {
    document = getDocument(),
    ...options
  }: ICreateElementOptions = {},
): Element {
  return document.createElement(tagName, options);
}

