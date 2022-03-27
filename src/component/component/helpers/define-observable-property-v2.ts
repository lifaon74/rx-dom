import { IObservable, IObserver, ISource, mergeAllSingleObservable, readObservableValue, single } from '@lifaon/rx-js-light';
import { objectDefineProperty } from '../../../misc/object-define-property';

const DEFAULT_OPTIONS = {
  configurable: true,
  enumerable: true,
};

export function bindPropertyWithSource<GName extends string, GValue>(
  target: Record<GName, GValue>,
  propertyName: GName,
  {
    emit,
    subscribe,
  }: ISource<GValue>,
): void {
  objectDefineProperty(target, propertyName, {
    ...DEFAULT_OPTIONS,
    get: (): GValue => {
      return readObservableValue(subscribe, (): GValue => {
        console.warn(`The source did not immediately send a value`);
        return (void 0) as unknown as GValue;
      });
    },
    set: emit,
  });
}

export function bindObservablePropertyWithHigherOrderSource<GName extends string, GValue>(
  target: Record<GName, IObservable<GValue>>,
  propertyName: GName,
  {
    emit,
    subscribe,
  }: ISource<IObservable<GValue>>,
): void {
  bindObservablePropertyWithHigherOrderObserverAndObservable<GName, GValue>(
    target,
    propertyName,
    emit,
    mergeAllSingleObservable(subscribe),
  );
}

export function bindObservablePropertyWithHigherOrderObserverAndObservable<GName extends string, GValue>(
  target: Record<GName, IObservable<GValue>>,
  propertyName: GName,
  emit: IObserver<IObservable<GValue>>,
  subscribe: IObservable<GValue>,
): void {
  objectDefineProperty(target, propertyName, {
    ...DEFAULT_OPTIONS,
    get: (): IObservable<GValue> => {
      return subscribe;
    },
    set: emit,
  });
}

export function bindReadonlyObserverPropertyWithHigherOrderObserver<GName extends string, GValue>(
  target: Record<GName, IObserver<GValue>>,
  propertyName: GName,
  emit: IObserver<IObservable<GValue>>,
): void {
  bindReadonlyObserverPropertyWithObserver<GName, GValue>(
    target,
    propertyName,
    (value: GValue): void => {
      emit(single(value));
    },
  );
}

export function bindReadonlyObserverPropertyWithObserver<GName extends string, GValue>(
  target: Record<GName, IObserver<GValue>>,
  propertyName: GName,
  emit: IObserver<GValue>,
): void {
  objectDefineProperty(target, `$${propertyName}`, {
    ...DEFAULT_OPTIONS,
    get: (): IObserver<GValue> => {
      return emit;
    },
    set: (): never => {
      throw new Error(`Readonly`);
    },
  });
}
