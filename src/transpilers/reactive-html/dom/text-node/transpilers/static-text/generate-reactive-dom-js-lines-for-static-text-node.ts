import { ILines } from '../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForStaticTextNode(
  text: string,
): ILines {
  return [
    `// static text node`,
    `nodeAppendChild(parentNode, createTextNode(${JSON.stringify(text)}));`,
  ];
}
