export function cloneNode<GNode extends Node>(
  node: GNode,
  deep?: boolean,
): GNode {
  return node.cloneNode(deep) as GNode;
}
