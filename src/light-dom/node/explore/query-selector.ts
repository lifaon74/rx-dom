export function querySelector<GKey extends keyof HTMLElementTagNameMap>(
  parentNode: ParentNode,
  selector: GKey,
): HTMLElementTagNameMap[GKey] | null;
export function querySelector<GElement extends Element>(
  parentNode: ParentNode,
  selector: string,
): GElement | null;
export function querySelector<GElement extends Element>(
  parentNode: ParentNode,
  selector: string,
): GElement | null {
  return parentNode.querySelector<GElement>(selector);
}

export function querySelectorOrThrow<GElement extends Element>(
  parentNode: ParentNode,
  selector: string,
): GElement | never {
  const element: GElement | null = querySelector<GElement>(parentNode, selector);
  if (element === null) {
    throw new Error(`querySelector failed to retrieve: '${selector}'`);
  } else {
    return element;
  }
}
