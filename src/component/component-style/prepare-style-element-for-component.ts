import { setAttributeValue } from '../../light-dom/attribute/set-attribute-value';
import { reflectCSSStyleSheetOnOwnStyleElement } from './helpers/reflect-css-style-sheet-on-own-style-element';
import { getAttributeValue } from '../../light-dom/attribute/get-attribute-value';
import { activateStyleElement } from './helpers';
import { generateComponentStyleUUID } from './generate-component-style-uuid';

export const HOST_ATTRIBUTE_NAME = 'host';

export function prepareStyleElementForComponent(
  htmlStyleElement: HTMLStyleElement,
  refreshCSS: boolean = false,
): void {
  const id: string = generateComponentStyleUUID();
  setAttributeValue(htmlStyleElement, HOST_ATTRIBUTE_NAME, id);
  activateStyleElement(htmlStyleElement, false);

  const sheet: CSSStyleSheet = htmlStyleElement.sheet as CSSStyleSheet;

  for (let i = 0, l = sheet.cssRules.length; i < l; i++) {
    const rule: CSSRule = sheet.cssRules[i];
    switch (rule.type) {
      case CSSRule.STYLE_RULE:
        // console.log(rule);
        // debugger;
        (rule as CSSStyleRule).selectorText = (rule as CSSStyleRule).selectorText
          .replace(/:host/g, `[${ id }]`)
        ;
        break;
      case CSSRule.SUPPORTS_RULE:
        break;
    }
  }

  if (refreshCSS) {
    reflectCSSStyleSheetOnOwnStyleElement(sheet);
  }
}

export function applyStyleElementForComponent(
  htmlStyleElement: HTMLStyleElement,
  node: Element,
): void {
  const host: string | null = getAttributeValue(htmlStyleElement, HOST_ATTRIBUTE_NAME);
  if (host === null) {
    throw new Error(`Missing host attribute`);
  } else {
    setAttributeValue(node, host, '');
  }

}
