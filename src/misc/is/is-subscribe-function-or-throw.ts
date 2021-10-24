import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { isSubscribeFunction } from './is-subscribe-function';

export function isSubscribeFunctionOrThrow<GValue>(
  value: unknown,
): asserts value is ISubscribeFunction<GValue> {
  if (!isSubscribeFunction(value)) {
    throw new TypeError(`Not a subscribe function`);
  }
}
