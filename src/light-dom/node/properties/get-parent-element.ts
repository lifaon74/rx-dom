
export function getParentElement<GElement extends Element>(
  node: Node,
): GElement | null {
  return node.parentElement as (GElement | null);
}


export function getParentElementOrThrow<GElement extends Element>(
  node: Node,
): GElement {
  const parentElement: GElement | null = getParentElement<GElement>(node);
  if (parentElement === null) {
    throw new Error(`Expected a parentElement`);
  } else {
    return parentElement;
  }
}
