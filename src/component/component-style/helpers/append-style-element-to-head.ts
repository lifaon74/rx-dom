import { getDocumentHead } from '../../../light-dom/node/explore/get-document-head';
import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';

export function appendStyleElementToHead(
  styleElement: HTMLStyleElement,
): void {
  nodeAppendChild(getDocumentHead(), styleElement);
}
