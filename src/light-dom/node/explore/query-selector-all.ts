export function querySelectorAll<GKey extends keyof HTMLElementTagNameMap>(
  parentNode: ParentNode,
  selector: GKey,
): NodeListOf<HTMLElementTagNameMap[GKey]>;
export function querySelectorAll<GElement extends Element>(
  parentNode: ParentNode,
  selector: string,
): NodeListOf<GElement>;
export function querySelectorAll<GElement extends Element>(
  parentNode: ParentNode,
  selector: string,
): NodeListOf<GElement> {
  return parentNode.querySelectorAll<GElement>(selector);
}

