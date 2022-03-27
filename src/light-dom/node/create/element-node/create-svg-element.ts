import { SVG_NAMESPACE_URI_CONSTANT } from '../../properties/namespace-uri/svg-namespace-uri.constant';
import { ICreateElementOptions } from './create-element';
import { createElementNS } from './create-element-ns';

export function createSVGElement<GQualifiedName extends keyof SVGElementTagNameMap>(
  qualifiedName: GQualifiedName,
  options?: ICreateElementOptions,
): SVGElementTagNameMap[GQualifiedName] {
  return createElementNS<GQualifiedName>(SVG_NAMESPACE_URI_CONSTANT, qualifiedName, options);
}

