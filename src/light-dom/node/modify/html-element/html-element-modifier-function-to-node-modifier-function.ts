import { INodeModifierFunction } from '../node/node-modifier-function.type';
import { IGenericHTMLElementModifierFunction, IHTMLElementModifierFunction } from './html-element-modifier-function.type';

export type IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction> =
  GHTMLElementModifierFunction extends IHTMLElementModifierFunction<infer GArguments, infer GOutElement>
    ? INodeModifierFunction<GArguments, GOutElement>
    : never;

// export function htmlElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction>(
//   modify: GHTMLElementModifierFunction,
// ): IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction> {
//   return ((
//     node: Element,
//     ...args: InferHTMLElementModifierFunctionGArguments<GHTMLElementModifierFunction>
//   ): InferHTMLElementModifierFunctionGOutElement<GHTMLElementModifierFunction> => {
//     if (isHTMLElement(node)) {
//       return modify(node as HTMLElement, ...args) as InferHTMLElementModifierFunctionGOutElement<GHTMLElementModifierFunction>;
//     } else {
//       throw new Error(`Not an HTMLElement`);
//     }
//   }) as unknown as IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction>;
// }

/**
 * Fast version
 */
export function htmlElementModifierFunctionToNodeModifierFunction<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction>(
  modify: GHTMLElementModifierFunction,
): IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction> {
  return modify as unknown as IHTMLElementModifierFunctionToElementModifierFunction<GHTMLElementModifierFunction>;
}
