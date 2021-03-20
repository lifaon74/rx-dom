import { ISVGElementTagName, SVG_ELEMENT_TAG_NAMES_SET } from '../constants/svg-element-tag-names-set.constant';

export function isSVGElementTagName<GName extends ISVGElementTagName>(
  value: string,
): value is GName {
  return SVG_ELEMENT_TAG_NAMES_SET.has(value as any);
}
