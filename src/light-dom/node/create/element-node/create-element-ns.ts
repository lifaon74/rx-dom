import { getDocument } from '../../explore/get-document';
import { ICreateElementOptions } from './create-element';

export function createElementNS<GQualifiedName extends keyof SVGElementTagNameMap>(
  namespaceURI: 'http://www.w3.org/2000/svg',
  qualifiedName: GQualifiedName,
  options?: ICreateElementOptions,
): SVGElementTagNameMap[GQualifiedName];
export function createElementNS<GElement extends Element>(
  namespaceURI: string | null,
  qualifiedName: string,
  options?: ICreateElementOptions,
): GElement;
export function createElementNS(
  namespaceURI: string | null,
  qualifiedName: string,
  {
    document = getDocument(),
    ...options
  }: ICreateElementOptions = {},
): Element {
  return document.createElementNS(namespaceURI, qualifiedName, options);
}
