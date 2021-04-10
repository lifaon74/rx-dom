import { HTML_ELEMENT_TAG_NAMES_SET, IHTMLElementTagName } from '../constants/html-element-tag-names-set.constant';

export function isHTMLElementTagName<GName extends IHTMLElementTagName>(
  value: string,
): value is GName {
  return HTML_ELEMENT_TAG_NAMES_SET.has(value as any);
}
