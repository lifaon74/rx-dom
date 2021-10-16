import {
  extractModifierPropertyFromReactiveHTMLAttribute,
  IModifierProperty,
} from '../../../attribute/transpilers/modifier/extract-modifier-property-from-reactive-html-attribute';

export function extractModifierPropertiesFromReactiveHTMLAttributes(
  attributes: ArrayLike<Attr>,
): IModifierProperty[] {
  const modifiers: IModifierProperty[] = [];

  for (let i = 0, l = attributes.length; i < l; i++) {
    const modifier: IModifierProperty | null = extractModifierPropertyFromReactiveHTMLAttribute(attributes[i]);
    if (modifier !== null) {
      modifiers.push(modifier);
    }
  }

  return modifiers;
}




