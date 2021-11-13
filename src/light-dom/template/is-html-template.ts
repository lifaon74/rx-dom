import { isFunction } from '../../misc/is/is-function';
import { IHTMLTemplate } from './template.type';

export function isHTMLTemplate<GTemplateArgument extends object>(
  value: unknown,
): value is IHTMLTemplate<GTemplateArgument> {
  return isFunction(value);
}
