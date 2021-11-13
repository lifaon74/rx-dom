import { IObservable } from '@lifaon/rx-js-light';
import { isFunction } from './is-function';

export function isObservable<GValue>(
  value: unknown,
): value is IObservable<GValue> {
  return isFunction(value);
}
