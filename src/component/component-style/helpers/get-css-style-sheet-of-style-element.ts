import { nodeRemove } from '../../../light-dom';
import { appendStyleElementToHead } from './append-style-element-to-head';

export interface IGetCSSStyleSheetContextOfStyleElementCallback {
  (sheet: CSSStyleSheet): void;
}

export function getCSSStyleSheetContextOfStyleElement(
  styleElement: HTMLStyleElement,
  callback: IGetCSSStyleSheetContextOfStyleElementCallback,
): void {
  if (styleElement.sheet === null) {
    appendStyleElementToHead(styleElement);
    if (styleElement.sheet === null) {
      throw new Error(`Unable to get sheet`);
    } else {
      callback(styleElement.sheet);
    }
    nodeRemove(styleElement);
  } else {
    callback(styleElement.sheet);
  }
}

export function getCSSStyleSheetOfStyleElement(
  styleElement: HTMLStyleElement,
): CSSStyleSheet {
  let _sheet!: CSSStyleSheet;
  getCSSStyleSheetContextOfStyleElement(styleElement, (sheet: CSSStyleSheet) => {
    _sheet = sheet;
  });
  return _sheet;
}

