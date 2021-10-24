import { getDocumentHead, nodeAppendChild } from '../../../light-dom';

export function appendStyleElementToHead(
  styleElement: HTMLStyleElement,
): void {
  nodeAppendChild(getDocumentHead(), styleElement);
}
