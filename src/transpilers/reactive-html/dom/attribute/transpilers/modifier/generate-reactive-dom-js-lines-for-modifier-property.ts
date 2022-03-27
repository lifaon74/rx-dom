import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireGetNodeModifierKey,
  REQUIRE_GET_NODE_MODIFIER_CONSTANT,
} from '../../../../require-external/types/require-get-node-modifier.type';
import { IModifierProperty } from './extract-modifier-property-from-reactive-html-attribute';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForModifierProperty =
  | IRequireGetNodeModifierKey
  ;

export function generateReactiveDOMJSLinesForModifierProperty(
  modifierProperty: IModifierProperty,
  lines: ILines,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForModifierProperty>,
): ILines {
  const getNodeModifier: string = requireExternalFunction(REQUIRE_GET_NODE_MODIFIER_CONSTANT);
  return [
    `// modifier ${JSON.stringify(modifierProperty.name)}`,
    ...scopeLines([
      `const _node = node;`,
      ...scopeLines([
        `const node = ${getNodeModifier}(${JSON.stringify(modifierProperty.name)})(_node, ...${modifierProperty.value});`,
        ...lines,
      ]),
    ]),
  ];
}
