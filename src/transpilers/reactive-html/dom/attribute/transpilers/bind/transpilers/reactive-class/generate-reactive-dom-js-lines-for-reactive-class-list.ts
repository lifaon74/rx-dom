import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveClassList(
  value: string,
): ILines {
  return [
    `// reactive class list`,
    `setReactiveClassList(toObservable(${value}), node);`,
  ];
}
