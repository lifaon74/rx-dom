/**
 * Returns true if attaching 'node' before 'referenceNode' creates a change
 */
export function isAttachDocumentFragmentUseful(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode: Node | null,
): boolean {
  return (parentNode !== fragment);
}

