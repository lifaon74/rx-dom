import { createStyleElement } from '../helpers/create-style-element';

export function compileReactiveCSSAsComponentStyle(
  css: string,
): HTMLStyleElement {
  return createStyleElement(css);
}

// export function compileReactiveCSSAsComponentStyle(
//   css: string,
// ): HTMLStyleElement {
//   const htmlStyleElement: HTMLStyleElement = createStyleElement(css, false);
//   prepareStyleElementForComponent(htmlStyleElement);
//   return htmlStyleElement;
// }
