import {
  createMulticastReplayLastSource,
  ICreateMulticastReplayLastSourceOptions,
  IObservable,
  IObserver,
  mergeAllSingleObservable,
  readObservableValue,
  single,
} from '@lifaon/rx-js-light';

import { IComponentInput } from './component-input.type';

export function componentInput$$<GValue>(
  initialValue: GValue,
): IComponentInput<GValue> {
  return createComponentInput<GValue>({ initialValue });
}

export function componentInputU$$<GValue>(): IComponentInput<GValue> {
  return createComponentInput<GValue>();
}

export function createComponentInput<GValue>(
  options?: ICreateMulticastReplayLastSourceOptions<GValue>,
): IComponentInput<GValue> {
  const _options: ICreateMulticastReplayLastSourceOptions<IObservable<GValue>> | undefined = ((options === void 0) || !('initialValue' in options))
    ? options as (ICreateMulticastReplayLastSourceOptions<IObservable<GValue>> | undefined)
    : {
      ...options,
      initialValue: single<GValue>((options as any).initialValue),
    };

  const { emit, subscribe } = createMulticastReplayLastSource<IObservable<GValue>>(_options);

  const $value = (value: GValue) => {
    emit(single(value));
  };

  const value$ = mergeAllSingleObservable(subscribe);

  return {
    // value: GValue;
    get value(): GValue {
      return readObservableValue(value$, (): GValue => {
        console.warn(`The source did not immediately send a value`);
        return (void 0) as unknown as GValue;
      });
    },
    set value(value: GValue) {
      $value(value);
    },

    // value$: IObservable<GValue>;
    get value$(): IObservable<GValue> {
      return value$;
    },
    set value$(value: IObservable<GValue>) {
      emit(value);
    },

    // readonly $value: IObserver<GValue>;
    get $value(): IObserver<GValue> {
      return $value;
    },
    set $value(value: IObserver<GValue>) {
      throw new Error(`Readonly`);
    },
  };
}

