import { compileCSSRulesForComponent } from './compile-css-rules-for-component';

export function compileCSSStyleSheetForComponent(
  sheet: CSSStyleSheet,
  componentId: string,
): void {
  compileCSSRulesForComponent(sheet.cssRules, componentId);
}
