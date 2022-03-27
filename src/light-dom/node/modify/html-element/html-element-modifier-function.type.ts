
export interface IHTMLElementModifierFunction<GArguments extends any[], GOutElement extends Element> {
  (
    node: HTMLElement,
    ...args: GArguments
  ): GOutElement;
}

export type IGenericHTMLElementModifierFunction = IHTMLElementModifierFunction<any[], Element>;


/** INFER **/

export type InferHTMLElementModifierFunctionGArguments<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction> =
  GHTMLElementModifierFunction extends IHTMLElementModifierFunction<infer GArguments, infer GOutElement>
    ? GArguments
    : never;

export type InferHTMLElementModifierFunctionGOutElement<GHTMLElementModifierFunction extends IGenericHTMLElementModifierFunction> =
  GHTMLElementModifierFunction extends IHTMLElementModifierFunction<infer GArguments, infer GOutElement>
    ? GOutElement
    : never;
