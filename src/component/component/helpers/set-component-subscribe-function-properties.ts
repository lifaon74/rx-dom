import {
  ISource, ISubscribeFunction, mergeAllSingleSubscribePipe, noop, pipeSubscribeFunction, single
} from '@lifaon/rx-js-light';

export type IHavingSubscribeFunctionProperties<GName extends string, GValue> =
  Record<`${ GName }$`, ISubscribeFunction<GValue>>
  & Record<GName, GValue>;

export type IObjectWithSubscribeFunctionProperties<GTarget extends object, GName extends string, GValue> =
  GTarget
  & IHavingSubscribeFunctionProperties<GName, GValue>;

export type IPropertySetMode = 'enable' | 'skip' | 'throw';

interface IPropertySetFunction<GValue> {
  (value: GValue): void;
}

function createPropertySetFunction<GValue>(
  setFunction: IPropertySetFunction<GValue>,
  setMode: IPropertySetMode,
): IPropertySetFunction<GValue>  {
  switch (setMode) {
    case 'enable':
      return setFunction;
    case 'skip':
      return noop;
    case 'throw':
      return () => {
        throw new Error(`Readonly`);
      };
    default:
      throw new Error(`Invalid mode`);
  }
}

export function setComponentSubscribeFunctionProperties<GTarget extends object, GName extends string, GValue>(
  target: GTarget,
  propertyName: GName,
  // $source$: IReplayLastSource<ISubscribeFunction<GValue>, ISource<ISubscribeFunction<GValue>>>,
  $source$: ISource<ISubscribeFunction<GValue>>,
  setMode: IPropertySetMode = 'enable',
): IObjectWithSubscribeFunctionProperties<GTarget, GName, GValue> {

  const source$: ISubscribeFunction<GValue> = pipeSubscribeFunction($source$.subscribe, [
    mergeAllSingleSubscribePipe<GValue>(),
  ]);

  // let cachedValue: GValue;
  // source$((value: GValue): void => {
  //   cachedValue = value;
  // });

  Object.defineProperty(target, `${ propertyName }$`, {
    configurable: true,
    enumerable: true,
    get: (): ISubscribeFunction<GValue> => {
      return source$;
    },
    set: createPropertySetFunction<ISubscribeFunction<GValue>>((value: ISubscribeFunction<GValue>): void => {
      $source$.emit(value);
    }, setMode),
  });

  Object.defineProperty(target, propertyName, {
    configurable: true,
    enumerable: true,
    get: (): GValue => {
      let cachedValueReceived: boolean = false;
      let cachedValue!: GValue;

      source$((value: GValue): void => {
        cachedValueReceived = true;
        cachedValue = value;
      })();

      if (!cachedValueReceived) {
        console.warn(`The source did not send immediately a value`);
      }

      return cachedValue;
    },
    set: createPropertySetFunction<GValue>((value: GValue): void => {
      $source$.emit(single(value));
    }, setMode),
  });

  return target as any;
}

