import { IObservable } from '@lifaon/rx-js-light';
import { isObservable } from './is-observable';

export function isObservableOrThrow<GValue>(
  value: unknown,
): asserts value is IObservable<GValue> {
  if (!isObservable(value)) {
    throw new TypeError(`Not a subscribe function`);
  }
}
