import { MATH_MAL_NAMESPACE_URI_CONSTANT } from '../../properties/namespace-uri/math-ml-namespace-uri.constant';
import { ICreateElementOptions } from './create-element';
import { createElementNS } from './create-element-ns';

export function createMathMLElement<GElement extends Element>(
  qualifiedName: string,
  options?: ICreateElementOptions,
): GElement {
  return createElementNS<GElement>(MATH_MAL_NAMESPACE_URI_CONSTANT, qualifiedName, options);
}

