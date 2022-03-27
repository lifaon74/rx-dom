import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXTemplate(
  argumentsLines: ILinesOrNull,
  bodyLines: ILinesOrNull,
): ILines {
  return [
    `(`,
    ...indentLines([
      `parentNode,`,
      ...optionalLines(argumentsLines),
    ]),
    `) => {`,
    ...indentLines([
      ...optionalLines(bodyLines),
      `return parentNode;`,
    ]),
    `}`,
  ];
}
