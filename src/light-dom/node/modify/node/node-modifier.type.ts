import { IGenericNodeModifierFunction } from './node-modifier-function.type';

export interface INodeModifier<GName, GNodeModifierFunction extends IGenericNodeModifierFunction> {
  readonly name: GName;
  readonly modify: GNodeModifierFunction;
}

export type IGenericNodeModifier = INodeModifier<string, IGenericNodeModifierFunction>;

