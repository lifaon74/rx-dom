import { compileCSSRulesForComponent } from './compile-css-rules-for-component';

export function compileCSSGroupingRuleForComponent(
  rule: CSSGroupingRule,
  componentId: string,
): void {
  compileCSSRulesForComponent(rule.cssRules, componentId);
}
