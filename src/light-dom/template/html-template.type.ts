/**
 * An HTMLTemplate is a function inserting nodes into a parentNode and returning this parentNode
 */
export interface IHTMLTemplate<GArguments extends any[]> {
  <GParentNode extends Node>(
    parentNode: GParentNode,
    ...args: GArguments
  ): GParentNode;
}
