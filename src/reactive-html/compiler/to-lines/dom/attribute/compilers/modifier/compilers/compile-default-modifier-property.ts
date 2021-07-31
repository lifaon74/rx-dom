import { ILines } from '../../../../../compiler.types';
import { scopeLines } from '../../../../../helpers';
import { IModifierProperty } from '../extract-modifier-property';

export function compileDefaultModifierProperty(
  modifierProperty: IModifierProperty,
): ILines {
  return [
    `// modifier ${JSON.stringify(modifierProperty.name)}`,
    ...scopeLines([
      `const _node = node;`,
      ...scopeLines([
        `const node = getNodeModifier(${JSON.stringify(modifierProperty.name)})(_node, ...${modifierProperty.value});`,
      ]),
    ]),
  ];
}
