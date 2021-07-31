import { compileCSSGroupingRuleForComponent } from './compile-css-grouping-rule-for-component';

export function compileCSSSupportsRuleForComponent(
  rule: CSSSupportsRule,
  componentId: string,
): void {
  compileCSSGroupingRuleForComponent(rule, componentId);
}
