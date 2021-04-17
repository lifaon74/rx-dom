


export function getShadowRootHost<GElement extends Element>(
  node: ShadowRoot,
): GElement {
  return node.host as GElement;
}
