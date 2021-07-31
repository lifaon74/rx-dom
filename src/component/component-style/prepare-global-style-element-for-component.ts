import { setAttributeValue } from '../../light-dom/attribute/set-attribute-value';
import { compileGlobalStyleElementForComponent } from './compile/global/compile-global-style-element-for-component';
import { reflectCSSStyleSheetOnOwnStyleElement } from './helpers/reflect-css-style-sheet-on-own-style-element';
import { getAttributeValue } from '../../light-dom/attribute/get-attribute-value';
import { activateStyleElement, getCSSStyleSheetOfStyleElement } from './helpers';
import { generateComponentStyleUUID } from './generate-component-style-uuid';
import { cloneNode } from '../../light-dom';
import { appendStyleElementToHead } from './helpers/append-style-element-to-head';

export const HOST_ATTRIBUTE_NAME = 'host';

const GLOBAL_STYLE_ELEMENTS_MAP = new WeakMap<HTMLStyleElement, HTMLStyleElement>();

export function getGlobalStyleElementForComponent(
  styleElement: HTMLStyleElement,
): HTMLStyleElement {
  let globalHTMLStyleElement: HTMLStyleElement | undefined = GLOBAL_STYLE_ELEMENTS_MAP.get(styleElement);
  if (globalHTMLStyleElement === void 0) {
    globalHTMLStyleElement = cloneNode(styleElement, true);
    GLOBAL_STYLE_ELEMENTS_MAP.set(styleElement, globalHTMLStyleElement);
    compileGlobalStyleElementForComponent(globalHTMLStyleElement);
  }
  return globalHTMLStyleElement;
}



export function applyGlobalStyleElementForComponent(
  styleElement: HTMLStyleElement,
  node: Element,
): void {
  const host: string | null = getAttributeValue(styleElement, HOST_ATTRIBUTE_NAME);
  if (host === null) {
    throw new Error(`Missing host attribute`);
  } else {
    setAttributeValue(node, host, '');
  }
}
