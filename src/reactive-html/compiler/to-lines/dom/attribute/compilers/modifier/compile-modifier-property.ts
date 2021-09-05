import { ILines } from '../../../../compiler.types';
import { scopeLines } from '../../../../helpers';
import { extractModifierProperty, IModifierProperty } from './extract-modifier-property';

export function compileModifierAttribute(
  attribute: Attr,
): ILines | null {
  const modifierProperty: IModifierProperty | null = extractModifierProperty(attribute);
  return (modifierProperty === null)
     ? null
    : compileModifierProperty(modifierProperty);
}

/**
 * INFO: this function returns empty lines because the modifierProperty must be directly handled on the node level
 */
export function compileModifierProperty(
  modifierProperty: IModifierProperty,
): ILines {
  return [];
}


export function generateModifierPropertyLines(
  modifierProperty: IModifierProperty,
  lines: ILines,
): ILines {
  return [
    `// modifier ${JSON.stringify(modifierProperty.name)}`,
    ...scopeLines([
      `const _node = node;`,
      ...scopeLines([
        `const node = getNodeModifier(${JSON.stringify(modifierProperty.name)})(_node, ...${modifierProperty.value});`,
        ...lines,
      ]),
    ]),
  ];
}

