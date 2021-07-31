import { createMissingNodeModifierRXDOMError } from '../../../../misc/errors/rx-dom-error-3--missing-node-modifier';
import { IGetNodeModifierFunction } from './get-node-modifier-function.type';
import { IGenericNodeModifierFunction } from './node-modifier-function.type';
import { IGenericNodeModifier } from './node-modifier.type';

export function generateGetNodeModifierFunctionFromArray(
  modifiers: ArrayLike<IGenericNodeModifier>,
): IGetNodeModifierFunction {
  return generateGetNodeModifierFunctionFromMap(
    new Map<string, IGenericNodeModifierFunction>(
      Array.from(modifiers, ({ name, modify }): [string, IGenericNodeModifierFunction] => {
        return [name, modify];
      }),
    ),
  );
}

export function generateGetNodeModifierFunctionFromMap(
  modifiers: Map<string, IGenericNodeModifierFunction>,
): IGetNodeModifierFunction {
  return (
    name: string,
  ): IGenericNodeModifierFunction => {
    if (modifiers.has(name)) {
      return modifiers.get(name) as IGenericNodeModifierFunction;
    } else {
      throw createMissingNodeModifierRXDOMError(name);
    }
  };
}
