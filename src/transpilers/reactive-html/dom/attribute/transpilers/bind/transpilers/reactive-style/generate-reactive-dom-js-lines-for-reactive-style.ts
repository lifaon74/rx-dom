import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveStyle(
  name: string,
  value: string,
): ILines {
  return [
    `// reactive style '${name}'`,
    `setReactiveStyle(toSubscribeFunction(${value}), node, ${JSON.stringify(name)});`,
  ];
}
