import { IGenericNodeModifierFunction } from './node-modifier-function.type';

export interface IGetNodeModifierFunction {
  (name: string): IGenericNodeModifierFunction;
}
