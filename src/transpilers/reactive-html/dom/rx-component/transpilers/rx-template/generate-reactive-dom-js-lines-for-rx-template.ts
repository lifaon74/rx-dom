import { generateObjectPropertiesLines, IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { indentLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXTemplate(
  lines: ILines,
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `(`,
    ...indentLines(generateObjectPropertiesLines(constantsToImport, [])),
    `) => {`,
    ...indentLines([
      `const parentNode = createDocumentFragment();`,
      ...lines,
      `return parentNode;`,
    ]),
    `}`,
  ];
}
