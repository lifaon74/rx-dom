import { ILines } from '../../../../compiler.types';
import { generateModifierPropertyLines } from '../../../attribute';
import { IModifierProperty } from '../../../attribute/compilers/modifier/extract-modifier-property';
import { extractModifierProperties } from './extract-modifier-properties';

export function compileElementModifiers(
  node: Element,
  lines: ILines,
): ILines {
  const modifiers: IModifierProperty[] = extractModifierProperties(Array.from(node.attributes));
  return modifiers.reduce((lines: ILines, modifierProperty: IModifierProperty): ILines => {
    return generateModifierPropertyLines(modifierProperty, lines);
  }, lines);
}

