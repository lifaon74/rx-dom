import {
  IHavingSubscribeFunctionProperties, setComponentSubscribeFunctionProperties
} from './set-component-subscribe-function-properties';
import { ISource, ISubscribeFunction } from '@lifaon/rx-js-light';

export type ISubscribeFunctionProperty<GName extends string, GValue> = [name: GName, value: GValue];
export type IGenericSubscribeFunctionProperty = ISubscribeFunctionProperty<string, any>;

export type IHavingSubscribeFunctionPropertiesFromPropertyTuple<GProperty extends IGenericSubscribeFunctionProperty> =
  IHavingSubscribeFunctionProperties<GProperty[0], GProperty[1]>;

export type IHavingMultipleSubscribeFunctionProperties<GProperties extends readonly IGenericSubscribeFunctionProperty[]> = {
  [GKey in Extract<keyof GProperties, number>]: IHavingSubscribeFunctionPropertiesFromPropertyTuple<GProperties[GKey]>;
}[Extract<keyof GProperties, number>];

export type IObjectWithMultipleSubscribeFunctionProperties<GTarget extends object, GProperties extends readonly IGenericSubscribeFunctionProperty[]> =
  GTarget
  & IHavingMultipleSubscribeFunctionProperties<GProperties>;


export type ISubscribeFunctionPropertyToSubscribeFunctionSourceProperty<GProperty extends IGenericSubscribeFunctionProperty> = [
  name: GProperty[0],
  value: ISource<ISubscribeFunction<GProperty[1]>>
];

export type ISubscribeFunctionPropertiesToSubscribeFunctionSourceProperties<GProperties extends readonly IGenericSubscribeFunctionProperty[]> = {
  [GKey in Extract<keyof GProperties, number>]: ISubscribeFunctionPropertyToSubscribeFunctionSourceProperty<GProperties[GKey]>;
} & {
  length: number;
};

export function setComponentMultipleSubscribeFunctionProperties<GTarget extends object, GProperties extends readonly IGenericSubscribeFunctionProperty[]>(
  target: GTarget,
  properties: ISubscribeFunctionPropertiesToSubscribeFunctionSourceProperties<GProperties>,
): IObjectWithMultipleSubscribeFunctionProperties<GTarget, GProperties> {
  for (let i = 0, l = properties.length; i < l; i++) {
    setComponentSubscribeFunctionProperties(target, properties[i][0], properties[i][1]);
  }
  return target as any;
}
