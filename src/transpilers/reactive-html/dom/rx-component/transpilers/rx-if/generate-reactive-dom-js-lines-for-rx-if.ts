import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXIf(
  condition: string,
  templateTrue: string,
  templateFalse: string,
): ILines {
  return [
    `// reactive if`,
    `nodeAppendChild(parentNode, createReactiveIfNode(toSubscribeFunction(${condition}), ${templateTrue}, ${templateFalse}));`,
  ];
}
