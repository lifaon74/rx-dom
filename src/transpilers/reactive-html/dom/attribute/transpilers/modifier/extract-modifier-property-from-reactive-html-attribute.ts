/**
 * Syntax:
 *  - standard: $name
 *  - prefixed: mod-name
 */
export interface IModifierProperty {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
}

/*--------*/

const MODIFIER_ATTRIBUTE_BRACKET_PATTERN: string = '\\$([^\\)]+)';
const MODIFIER_ATTRIBUTE_PREFIX_PATTERN: string = 'mod-(.+)';
const MODIFIER_ATTRIBUTE_PATTERN: string = `(?:${MODIFIER_ATTRIBUTE_BRACKET_PATTERN})`
  + `|(?:${MODIFIER_ATTRIBUTE_PREFIX_PATTERN})`;
const MODIFIER_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${MODIFIER_ATTRIBUTE_PATTERN}$`);

export function extractModifierPropertyFromReactiveHTMLAttribute(
  attribute: Attr,
): IModifierProperty | null {
  const match: RegExpExecArray | null = MODIFIER_ATTRIBUTE_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[2] !== void 0);
    return {
      name: prefixMode ? match[2] : match[1],
      value: attribute.value.trim(),
      prefixMode,
    };
  }
}




