import { IGenericFunction } from '@lifaon/rx-js-light';

export function isFunction(
  value: unknown,
): value is IGenericFunction {
  return (typeof value === 'function');
}
