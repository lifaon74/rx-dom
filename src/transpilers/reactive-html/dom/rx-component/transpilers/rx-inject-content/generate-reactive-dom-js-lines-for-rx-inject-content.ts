import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXInjectContent(
  content: string,
): ILines {
  return [
    `// reactive content`,
    `nodeAppendChild(parentNode, createReactiveContentNode(toObservable(${content})));`,
  ];
}
