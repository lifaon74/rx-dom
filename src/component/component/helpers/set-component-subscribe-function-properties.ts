import {
  IEmitFunction,
  ISource,
  ISubscribeFunction,
  mergeAllSingleSubscribePipe,
  noop,
  pipeSubscribeFunction,
  readSubscribeFunctionValue,
  single,
} from '@lifaon/rx-js-light';
import { objectDefineProperty } from '../../../misc/object-define-property';

export type IHavingSubscribeFunctionProperties<GName extends string, GValue> =
  Record<`${GName}$`, ISubscribeFunction<GValue>>
  & Readonly<Record<`$${GName}`, IEmitFunction<GValue>>>
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
): IPropertySetFunction<GValue> {
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

const DEFAULT_OPTIONS = {
  configurable: true,
  enumerable: true,
};

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

  const $source: IEmitFunction<GValue> = (value: GValue): void => {
    $source$.emit(single(value));
  };

  // let cachedValue: GValue;
  // source$((value: GValue): void => {
  //   cachedValue = value;
  // });

  objectDefineProperty(target, `${propertyName}$`, {
    ...DEFAULT_OPTIONS,
    get: (): ISubscribeFunction<GValue> => {
      return source$;
    },
    set: createPropertySetFunction<ISubscribeFunction<GValue>>((value: ISubscribeFunction<GValue>): void => {
      $source$.emit(value);
    }, setMode),
  });

  objectDefineProperty(target, `$${propertyName}`, {
    ...DEFAULT_OPTIONS,
    get: (): IEmitFunction<GValue> => {
      return $source;
    },
    set: () => {
      throw new Error(`Readonly`);
    },
  });

  objectDefineProperty(target, propertyName, {
    ...DEFAULT_OPTIONS,
    get: (): GValue => {
      return readSubscribeFunctionValue(source$, (): GValue => {
        console.warn(`The source did not send immediately a value`);
        return (void 0) as unknown as GValue;
      });
    },
    set: createPropertySetFunction<GValue>($source, setMode),
  });

  return target as any;
}

