import { CSSStyleSheetToCSSString } from './css-style-sheet-to-css-string';
import { setStyleElementCSS } from './set-style-element-css';

/**
 * Reflect a CSSStyleSheet's content into its <style> element
 */
export function reflectCSSStyleSheetOnOwnStyleElement(
  sheet: CSSStyleSheet,
  ownerNode?: HTMLStyleElement,
): void {
  if (ownerNode === void 0) {
    if (sheet.ownerNode === null) {
      throw new Error(`Missing ownerNode`);
    } else {
      ownerNode = sheet.ownerNode as HTMLStyleElement;
    }
  }
  setStyleElementCSS(ownerNode, CSSStyleSheetToCSSString(sheet));
}
