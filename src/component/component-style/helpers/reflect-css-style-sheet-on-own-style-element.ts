import { CSSStyleSheetToCSSString } from './css-style-sheet-to-css-string';
import { setStyleElementCSS } from './set-style-element-css';

/**
 * Reflect a CSSStyleSheet's content into its <style> element
 */
export function reflectCSSStyleSheetOnOwnStyleElement(sheet: CSSStyleSheet): void {
  setStyleElementCSS(sheet.ownerNode as HTMLStyleElement, CSSStyleSheetToCSSString(sheet));
}
