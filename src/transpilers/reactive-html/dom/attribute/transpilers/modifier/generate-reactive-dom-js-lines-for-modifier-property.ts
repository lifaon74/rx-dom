import { scopeLines } from '../../../../../helpers';
import { ILines } from '../../../../../types/lines.type';
import { IModifierProperty } from './extract-modifier-property-from-reactive-html-attribute';

export function generateReactiveDOMJSLinesForModifierProperty(
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
