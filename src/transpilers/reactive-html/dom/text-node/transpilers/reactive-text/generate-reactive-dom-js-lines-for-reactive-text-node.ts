import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForReactiveTextNode(
  value: string,
): ILines {
  return [
    `// reactive text node`,
    `nodeAppendChild(parentNode, createReactiveTextNode(toSubscribeFunction(${value})));`,
  ];
}
