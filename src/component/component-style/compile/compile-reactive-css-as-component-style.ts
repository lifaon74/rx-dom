import { createStyleElement } from '../helpers/create-style-element';
import { compileGlobalStyleElementForComponent } from './global/compile-global-style-element-for-component';

export function compileReactiveCSSAsComponentStyle(
  css: string,
): HTMLStyleElement {
  const styleElement: HTMLStyleElement = createStyleElement(css);
  compileGlobalStyleElementForComponent(styleElement);
  return styleElement;
}

