import { createMissingNodeModifierRXDOMError } from '../../../../misc/errors/rx-dom-error-3--missing-node-modifier';
import { IGenericNodeModifierFunction } from './node-modifier-function.type';
import { IGenericNodeModifier } from './node-modifier.type';
import { IGetNodeModifierFunction } from './get-node-modifier-function.type';

export function generateGetNodeModifierFunctionFromModifiersList(
  modifiers: ArrayLike<IGenericNodeModifier>,
): IGetNodeModifierFunction {
  return generateGetNodeModifierFunctionFromModifiersMap(
    new Map<string, IGenericNodeModifierFunction>(
      Array.from(modifiers, ({ name, modify }): [string, IGenericNodeModifierFunction] => {
        return [name, modify];
      }),
    ),
  );
}

export function generateGetNodeModifierFunctionFromModifiersMap(
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
