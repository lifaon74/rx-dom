import { isHTMLElement } from '../../type/is-html-element';
import { INodeModifierFunction } from '../node/node-modifier-function.type';
import { IGenericHTMLElementModifierFunction, IHTMLElementModifierFunction } from './html-element-modifier-function.type';

/** INFER **/

export type IHTMLElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction> =
  GHTMLElementModifierFunction extends IHTMLElementModifierFunction<infer GArguments, infer GNode>
    ? INodeModifierFunction<GArguments, GNode>
    : never
  ;

/** FUNCTION **/

export function htmlElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction>(
  callback: GHTMLElementModifierFunction,
): IHTMLElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction> {
  return ((node: Node, ...args: any[]): Node => {
    if (isHTMLElement(node)) {
      return callback(node, ...args);
    } else {
      throw new Error(`Not an HTMLElement`);
    }
  }) as IHTMLElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction>;
}
