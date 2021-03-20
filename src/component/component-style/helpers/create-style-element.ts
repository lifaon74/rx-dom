import { createElementNode } from '../../../light-dom/node/create/element-node/create-element-node';
import { nodeAppendChild } from '../../../light-dom/node/move/devired/dom-like/node/node-append-child';
import { activateStyleElement } from './activate-style-element';
import { setStyleElementCSS } from './set-style-element-css';
import { getDocumentHead } from '../../../light-dom/node/explore/get-document-head';

/**
 * Creates an HTMLStyleElement with 'css' inside
 */
export function createStyleElement(
  css: string,
  activate: boolean = true,
): HTMLStyleElement {
  const styleElement: HTMLStyleElement = createElementNode('style');
  setStyleElementCSS(styleElement, css);
  nodeAppendChild(getDocumentHead(), styleElement);
  activateStyleElement(styleElement, activate); // keep after inserted because .sheet is only available when styleElement is in the DOM
  return styleElement;
}
