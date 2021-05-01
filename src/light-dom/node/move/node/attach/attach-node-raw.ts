export function attachNodeRaw(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  parentNode.insertBefore(node, referenceNode);
}
