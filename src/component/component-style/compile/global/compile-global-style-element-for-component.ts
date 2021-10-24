import { setAttributeValue } from '../../../../light-dom';
import { generateComponentStyleUUID } from '../../generate-component-style-uuid';
import { reflectCSSStyleSheetOnOwnStyleElement } from '../../helpers';
import { appendStyleElementToHead } from '../../helpers/append-style-element-to-head';
import { HOST_ATTRIBUTE_NAME } from '../../prepare-global-style-element-for-component';
import { compileCSSStyleSheetForComponent } from './compile-css-style-sheet-for-component';

export function compileGlobalStyleElementForComponent(
  styleElement: HTMLStyleElement,
  refreshCSS: boolean = false,
  // refreshCSS: boolean = true,
): void {
  const componentId: string = generateComponentStyleUUID();
  setAttributeValue(styleElement, HOST_ATTRIBUTE_NAME, componentId);

  // const container = createElementNode('div');
  // const shadow = attachShadow(container)
  // nodeAppendChild(shadow, styleElement);
  // nodeAppendChild(document.head, container);

  appendStyleElementToHead(styleElement);

  const sheet: CSSStyleSheet = styleElement.sheet as CSSStyleSheet;
  sheet.disabled = true;

  compileCSSStyleSheetForComponent(sheet, componentId);

  if (refreshCSS) {
    reflectCSSStyleSheetOnOwnStyleElement(sheet, styleElement);
  }
}
