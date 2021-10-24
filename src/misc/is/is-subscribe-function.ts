import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { isFunction } from './is-function';

export function isSubscribeFunction<GValue>(
  value: unknown,
): value is ISubscribeFunction<GValue> {
  return isFunction(value);
}
