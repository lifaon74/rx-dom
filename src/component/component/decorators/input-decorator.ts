import { IMulticastReplayLastSource } from '@lifaon/rx-js-light';

export interface IInputDecoratorGetSource<GValue> {
  (instance: any): IMulticastReplayLastSource<GValue>;
}

export interface IInputDecoratorOptions {

}

/**
 * DECORATOR (Property)
 */
export function Input<GValue>(
  getSource: IInputDecoratorGetSource<GValue>,
  options: IInputDecoratorOptions = {},
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: false,
      get: function (): GValue {
        return getSource(this).getValue();
      },
      set: function (value: GValue): void {
        getSource(this).emit(value);
      },
    });
  };
}
