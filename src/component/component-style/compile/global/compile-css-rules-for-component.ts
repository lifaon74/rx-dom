import { compileCSSMediaRuleForComponent } from './compile-css-media-rule-for-component';
import { compileCSSStyleRuleForComponent } from './compile-css-style-rule-for-component';
import { compileCSSSupportsRuleForComponent } from './compile-css-supports-rule-for-component';

export function compileCSSRulesForComponent(
  cssRules: CSSRuleList,
  componentId: string,
): void {
  for (let i = 0, l = cssRules.length; i < l; i++) {
    const rule: CSSRule = cssRules[i];
    switch (rule.type) {
      case CSSRule.STYLE_RULE:
        compileCSSStyleRuleForComponent(rule as CSSStyleRule, componentId);
        break;
      case CSSRule.MEDIA_RULE:
        compileCSSMediaRuleForComponent(rule as CSSMediaRule, componentId);
        break;
      case CSSRule.SUPPORTS_RULE:
        compileCSSSupportsRuleForComponent(rule as CSSSupportsRule, componentId);
        break;
    }
  }
}
