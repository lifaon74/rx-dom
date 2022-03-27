import { IObservable, IObserver } from '@lifaon/rx-js-light';

export interface IComponentInput<GValue> {
  value: GValue;
  value$: IObservable<GValue>;
  readonly $value: IObserver<GValue>;
}
