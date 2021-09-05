import { extractModifierProperty, IModifierProperty } from '../../../attribute/compilers/modifier/extract-modifier-property';

export function extractModifierProperties(
  attributes: ArrayLike<Attr>,
): IModifierProperty[] {
  const modifiers: IModifierProperty[] = [];

  for (let i = 0, l = attributes.length; i < l; i++) {
    const modifier: IModifierProperty | null = extractModifierProperty(attributes[i]);
    if (modifier !== null) {
      modifiers.push(modifier);
    }
  }

  return modifiers;
}




