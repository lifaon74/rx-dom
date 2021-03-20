import { getDocument } from '../../explore';
import { ICreateElementNodeOptions } from './create-element-node';

export function createElementNodeNS<GQualifiedName extends keyof SVGElementTagNameMap>(
  namespace: 'http://www.w3.org/2000/svg',
  qualifiedName: GQualifiedName,
  options?: ICreateElementNodeOptions,
): SVGElementTagNameMap[GQualifiedName];
export function createElementNodeNS<GElement extends Element>(
  namespace: string | null,
  qualifiedName: string,
  options?: ICreateElementNodeOptions,
): GElement;
export function createElementNodeNS(
  namespace: string | null,
  qualifiedName: string,
  {
    document = getDocument(),
    elementOptions,
  }: ICreateElementNodeOptions = {},
): Element {
  return document.createElementNS(namespace, qualifiedName, elementOptions);
}
