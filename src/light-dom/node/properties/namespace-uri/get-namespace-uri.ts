export function getNamespaceURI<GNode extends ChildNode>(
  node: Element,
): string {
  return node.namespaceURI as string;
}
