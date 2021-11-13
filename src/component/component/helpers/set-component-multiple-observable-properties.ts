import { ISource, IObservable } from '@lifaon/rx-js-light';
import { IHavingObservableProperty, defineObservableProperty } from './define-observable-property';

export type IObservableProperty<GName extends string, GValue> = [name: GName, value: GValue];
export type IGenericObservableProperty = IObservableProperty<string, any>;

export type IHavingObservablePropertiesFromPropertyTuple<GProperty extends IGenericObservableProperty> =
  IHavingObservableProperty<GProperty[0], GProperty[1]>;

// export type IHavingMultipleObservableProperties<GProperties extends readonly IGenericObservableProperty[]> = {
//   [GKey in Extract<keyof GProperties, number>]: IHavingObservablePropertiesFromPropertyTuple<GProperties[GKey]>;
// }[Extract<keyof GProperties, number>];

type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type IHavingMultipleObservableProperties<GProperties extends readonly IGenericObservableProperty[]> = UnionToIntersection<TupleTypes<{
  [GKey in keyof GProperties]: GProperties[GKey] extends IGenericObservableProperty
    ? IHavingObservablePropertiesFromPropertyTuple<GProperties[GKey]>
    : GProperties[GKey];
}>>;

export type IObjectWithMultipleObservableProperties<GTarget extends object, GProperties extends readonly IGenericObservableProperty[]> =
  GTarget
  & IHavingMultipleObservableProperties<GProperties>;

export type IObservablePropertyToObservableSourceProperty<GProperty extends IGenericObservableProperty> = [
  name: GProperty[0],
  value: ISource<IObservable<GProperty[1]>>
];

// export type IObservablePropertiesToObservableSourceProperties<GProperties extends readonly IGenericObservableProperty[]> = {
//   [GKey in Extract<keyof GProperties, number>]: IObservablePropertyToObservableSourceProperty<GProperties[GKey]>;
// } & {
//   length: number;
// };

export type IObservablePropertiesToObservableSourceProperties<GProperties extends readonly IGenericObservableProperty[]> = {
  [GKey in keyof GProperties]: GProperties[GKey] extends IGenericObservableProperty
    ? IObservablePropertyToObservableSourceProperty<GProperties[GKey]>
    : GProperties[GKey];
};

export function setComponentMultipleObservableProperties<GTarget extends object, GProperties extends readonly IGenericObservableProperty[]>(
  target: GTarget,
  properties: IObservablePropertiesToObservableSourceProperties<GProperties>,
): IObjectWithMultipleObservableProperties<GTarget, GProperties> {
  for (let i = 0, l = properties.length; i < l; i++) {
    defineObservableProperty(target, properties[i][0], properties[i][1]);
  }
  return target as any;
}

// type IAppIconComponentInputs = [
//   ['name', string],
//   ['sizeInner', number],
//   ['sizeOuterX', number],
//   ['sizeOuterY', number],
// ];
//
// const a: IHavingMultipleObservableProperties<IAppIconComponentInputs>;
// const b = a.name$;
//
