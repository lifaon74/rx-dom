export interface INodeModifierFunction<GArguments extends any[], GOutNode extends Node> {
  (
    node: Node,
    ...args: GArguments
  ): GOutNode;
}

export type IGenericNodeModifierFunction = INodeModifierFunction<any[], Node>;



