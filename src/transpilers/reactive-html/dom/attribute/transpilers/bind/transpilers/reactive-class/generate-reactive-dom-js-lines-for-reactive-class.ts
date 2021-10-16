import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveClass(
  name: string,
  value: string,
): ILines {
  return [
    `// reactive class '${name}'`,
    `setReactiveClass(toSubscribeFunction(${value}), node, ${JSON.stringify(name)});`,
  ];
}
