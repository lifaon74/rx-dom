import { ILines } from '../../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveAttribute(
  name: string,
  value: string,
): ILines {
  return [
    `// reactive attribute '${name}'`,
    `setReactiveAttribute(toSubscribeFunction(${value}), node, ${JSON.stringify(name)});`,
  ];
}
