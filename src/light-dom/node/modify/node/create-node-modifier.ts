import { freeze } from '@lifaon/rx-js-light';
import { IGenericNodeModifierFunction } from './node-modifier-function.type';
import { INodeModifier } from './node-modifier.type';

export function createNodeModifier<GName extends string, GNodeModifierFunction extends IGenericNodeModifierFunction>(
  name: GName,
  modify: GNodeModifierFunction,
): INodeModifier<GName, GNodeModifierFunction> {
  return freeze({
    name,
    modify,
  });
}
