import { ISubscribeFunction, single } from '@lifaon/rx-js-light';
import { isSubscribeFunction } from './is/is-subscribe-function';

export function toSubscribeFunction<GValue>(
  value: ISubscribeFunction<GValue> | GValue
): ISubscribeFunction<GValue> {
  return isSubscribeFunction(value)
    ? value
    : single(value);
}

export function toSubscribeFunctionStrict<GValue>(
  value: ISubscribeFunction<GValue> | GValue
): ISubscribeFunction<GValue> {
  if (isSubscribeFunction(value)) {
    return value;
  } else {
    throw new TypeError(`Not a subscribe function`);
  }
}
