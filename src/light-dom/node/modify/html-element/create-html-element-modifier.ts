import { createNodeModifier } from '../node';
import { INodeModifier } from '../node/node-modifier.type';
import {
  htmlElementModifierFunctionToNodeModifierFunction,
  IHTMLElementModifierFunctionToNodeModifierFunction,
} from './html-element-modifier-function-to-node-modifier-function';
import { IGenericHTMLElementModifierFunction } from './html-element-modifier-function.type';

export function createElementModifier<GName extends string, GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction>(
  name: GName,
  modify: GHTMLElementModifierFunction,
): INodeModifier<GName, IHTMLElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction>> {
  return createNodeModifier<GName, IHTMLElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction>>(
    name,
    htmlElementModifierFunctionToNodeModifierFunction(modify),
  );
}
