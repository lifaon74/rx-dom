import { IGenericNodeModifierFunction } from './node-modifier-function.type';

// export interface IGetNodeModifierFunction<GNodeModifierUnion extends IGenericNodeModifier> {
//   (name: GNodeModifierUnion['name']): GNodeModifierUnion['modify'];
// }

export interface IGetNodeModifierFunction {
  (name: string): IGenericNodeModifierFunction;
}
