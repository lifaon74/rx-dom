import { IObservable, single } from '@lifaon/rx-js-light';
import { isObservable } from './is/is-observable';

export function toObservable<GValue>(
  value: IObservable<GValue> | GValue,
): IObservable<GValue> {
  return isObservable(value)
    ? value
    : single(value);
}

export function toObservableThrowIfUndefined<GValue>(
  value: IObservable<GValue> | GValue,
): IObservable<GValue> {
  if (value === void 0) {
    throw new TypeError(`Not a subscribe function`);
  } else {
    return toObservable(value);
  }
}

export function toObservableStrict<GValue>(
  value: IObservable<GValue> | GValue,
): IObservable<GValue> {
  if (isObservable(value)) {
    return value;
  } else {
    throw new TypeError(`Not a subscribe function`);
  }
}
