import { createElementNode } from '../../../light-dom/node/create/element-node/create-element-node';
import { setStyleElementCSS } from './set-style-element-css';

/**
 * Creates an HTMLStyleElement with 'css' inside
 */
export function createStyleElement(
  css: string,
): HTMLStyleElement {
  const styleElement: HTMLStyleElement = createElementNode('style');
  setStyleElementCSS(styleElement, css);
  return styleElement;
}
