import { createNodeModifier } from '../node/create-node-modifier';
import { INodeModifier } from '../node/node-modifier.type';
import {
  htmlElementModifierFunctionToNodeModifierFunction,
  IHTMLElementModifierFunctionToElementModifierFunction,
} from './html-element-modifier-function-to-node-modifier-function';
import { IGenericHTMLElementModifierFunction } from './html-element-modifier-function.type';

export type IHTMLElementModifier<GName extends string, GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction> =
  INodeModifier<GName, IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction>>;

export function createHTMLElementModifier<GName extends string, GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction>(
  name: GName,
  modify: GHTMLElementModifierFunction,
): IHTMLElementModifier<GName, GHTMLElementModifierFunction> {
  return createNodeModifier(
    name,
    htmlElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction>(modify),
  );
}
