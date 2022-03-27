import { ICustomElementConstructor } from './custom-element-constructor.type';

export interface ICustomElementConstructorReference {
  (): ICustomElementConstructor;
}

const FUNCTION_PROTOTYPE = Object.getPrototypeOf(() => {});

export function isCustomElementConstructorReference(
  value: unknown,
): value is ICustomElementConstructorReference {
  return (typeof value === 'function')
    && (Object.getPrototypeOf(value) === FUNCTION_PROTOTYPE);
}
