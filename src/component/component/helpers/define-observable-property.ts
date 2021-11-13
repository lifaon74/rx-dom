import { IObservable, IObserver, ISource, let$$, mergeAllSingleObservable, noop, readObservableValue, single } from '@lifaon/rx-js-light';
import { objectDefineProperty } from '../../../misc/object-define-property';

export type IHavingObservableProperty<GPropertyName extends string, GValue> =
  Record<`${GPropertyName}$`, IObservable<GValue>>
  & Readonly<Record<`$${GPropertyName}`, IObserver<GValue>>>
  & Record<GPropertyName, GValue>;

export type IObjectWithObservableProperty<GTarget, GName extends string, GValue> =
  GTarget
  & IHavingObservableProperty<GName, GValue>;

export type IPropertySetMode = 'enable' | 'skip' | 'throw';

interface IPropertySetFunction<GValue> {
  (value: GValue): void;
}

const READONLY_SET_FUNCTION_THROW = (): never => {
  throw new Error(`Readonly`);
};

function createPropertySetFunction<GValue>(
  setFunction: IPropertySetFunction<GValue>,
  setMode: IPropertySetMode,
): IPropertySetFunction<GValue> {
  switch (setMode) {
    case 'enable':
      return setFunction;
    case 'skip':
      return noop;
    case 'throw':
      return READONLY_SET_FUNCTION_THROW;
    default:
      throw new Error(`Invalid mode`);
  }
}

const DEFAULT_OPTIONS = {
  configurable: true,
  enumerable: true,
};

// TODO refactor (rename) and improve
export function defineObservableProperty<GTarget, GName extends string, GValue>(
  target: GTarget,
  propertyName: GName,
  // $source$: IReplayLastSource<IObservable<GValue>, ISource<IObservable<GValue>>>,
  $source$: ISource<IObservable<GValue>>,
  setMode: IPropertySetMode = 'enable',
): IObjectWithObservableProperty<GTarget, GName, GValue> {

  const source$: IObservable<GValue> = mergeAllSingleObservable($source$.subscribe);

  const $source: IObserver<GValue> = (value: GValue): void => {
    $source$.emit(single(value));
  };

  // let cachedValue: GValue;
  // source$((value: GValue): void => {
  //   cachedValue = value;
  // });

  objectDefineProperty(target, `${propertyName}$`, {
    ...DEFAULT_OPTIONS,
    get: (): IObservable<GValue> => {
      return source$;
    },
    set: createPropertySetFunction<IObservable<GValue>>($source$.emit, setMode),
  });

  objectDefineProperty(target, `$${propertyName}`, {
    ...DEFAULT_OPTIONS,
    get: (): IObserver<GValue> => {
      return $source;
    },
    set: READONLY_SET_FUNCTION_THROW,
  });

  objectDefineProperty(target, propertyName, {
    ...DEFAULT_OPTIONS,
    get: (): GValue => {
      return readObservableValue(source$, (): GValue => {
        console.warn(`The source did not immediately send a value`);
        return (void 0) as unknown as GValue;
      });
    },
    set: createPropertySetFunction<GValue>($source, setMode),
  });

  return target as any;
}

export function defineSimpleObservableProperty<GValue>(
  target: any,
  propertyName: string,
  initialValue: GValue,
  setMode?: IPropertySetMode,
): IObservable<GValue> {
  return defineObservableProperty<any, string, GValue>(
    target,
    propertyName,
    let$$<IObservable<GValue>>(single(initialValue)),
    setMode,
  )[`${propertyName}$`];
}
