import { compileCSSGroupingRuleForComponent } from './compile-css-grouping-rule-for-component';

export function compileCSSMediaRuleForComponent(
  rule: CSSMediaRule,
  componentId: string,
): void {
  compileCSSGroupingRuleForComponent(rule, componentId);
}
