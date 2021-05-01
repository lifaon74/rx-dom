export function nodeContains(
  parentNode: Node,
  childNode: Node | null,
): boolean {
  return parentNode.contains(childNode);
}
