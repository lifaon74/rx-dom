import { indentLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXForLoop(
  items: string,
  template: string,
  options: string[],
): ILines {
  return [
    `// reactive for loop`,
    `nodeAppendChild(`,
    ...indentLines([
      `parentNode,`,
      `createReactiveForLoopNode(`,
      ...indentLines([
        `toSubscribeFunction(${items}),`,
        `${template},`,
        ...options,
      ]),
      `)`,
    ]),
    `);`,
  ];
}
