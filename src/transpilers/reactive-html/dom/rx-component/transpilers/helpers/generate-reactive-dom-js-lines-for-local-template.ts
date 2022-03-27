import { indentLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForLocalTemplate(
  bodyLines: ILines,
  templateName: string,
): ILines {
  return [
    `const ${templateName} = (`,
    ...indentLines(bodyLines),
    `);`,
  ];
}
