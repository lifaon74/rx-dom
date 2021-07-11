import { setAttributeValue } from '../../light-dom/attribute/set-attribute-value';
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
    prepareGlobalStyleElementForComponent(globalHTMLStyleElement, false);
  }
  return globalHTMLStyleElement;
}

function prepareGlobalStyleElementForComponent(
  styleElement: HTMLStyleElement,
  refreshCSS: boolean = false,
): void {
  const id: string = generateComponentStyleUUID();
  setAttributeValue(styleElement, HOST_ATTRIBUTE_NAME, id);

  appendStyleElementToHead(styleElement);

  const sheet: CSSStyleSheet = styleElement.sheet as CSSStyleSheet;
  sheet.disabled = true;

  for (let i = 0, l = sheet.cssRules.length; i < l; i++) {
    const rule: CSSRule = sheet.cssRules[i];
    switch (rule.type) {
      case CSSRule.STYLE_RULE:
        // console.log(rule);
        // debugger;
        // https://blog.angular-university.io/angular-host-context/
        (rule as CSSStyleRule).selectorText = (rule as CSSStyleRule).selectorText
          .replace(/:host/g, `[${ id }]`)
        ;
        break;
      case CSSRule.SUPPORTS_RULE:
        break;
    }
  }

  if (refreshCSS) {
    reflectCSSStyleSheetOnOwnStyleElement(sheet, styleElement);
  }
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
