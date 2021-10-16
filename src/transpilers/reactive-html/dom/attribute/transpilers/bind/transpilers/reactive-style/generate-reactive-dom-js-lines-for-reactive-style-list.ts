import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveStyleList(
  value: string,
): ILines {
  return [
    `// reactive style list`,
    `setReactiveStyleList(toSubscribeFunction(${value}), node);`,
  ];
}
