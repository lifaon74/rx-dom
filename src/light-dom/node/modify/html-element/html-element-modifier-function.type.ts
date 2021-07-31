export interface IHTMLElementModifierFunction<GArguments extends any[], GOutNode extends Node> {
  (node: HTMLElement, ...args: GArguments): GOutNode;
}

export type IGenericHTMLElementModifierFunction = IHTMLElementModifierFunction<any, Node>;



