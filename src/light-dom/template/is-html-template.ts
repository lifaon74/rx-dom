import { isFunction } from '../../misc/is/is-function';
import { IHTMLTemplate } from './html-template.type';

export function isHTMLTemplate<GArguments extends any[]>(
  value: unknown,
): value is IHTMLTemplate<GArguments> {
  return isFunction(value);
}
