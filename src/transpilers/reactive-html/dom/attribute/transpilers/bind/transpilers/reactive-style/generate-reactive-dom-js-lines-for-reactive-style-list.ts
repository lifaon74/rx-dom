import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveStyleList(
  value: string,
): ILines {
  return [
    `// reactive style list`,
    `setReactiveStyleList(toObservable(${value}), node);`,
  ];
}
