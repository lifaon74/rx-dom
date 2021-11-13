import { getAttributeValue } from '../../light-dom/attribute/get-attribute-value';
import { setAttributeValue } from '../../light-dom/attribute/set-attribute-value';

export const HOST_ATTRIBUTE_NAME = 'host';

export function applyGlobalStyleElementForComponent(
  styleElement: HTMLStyleElement,
  node: Element,
): void {
  const host: string | null = getAttributeValue(styleElement, HOST_ATTRIBUTE_NAME);
  if (host === null) {
    throw new Error(`Missing host attribute`);
  } else {
    setAttributeValue(node, host, '');
  }
}
