/**
 * Updates css content of an HTMLStyleElement
 */
export function setStyleElementCSS(
  styleElement: HTMLStyleElement,
  css: string,
): HTMLStyleElement {
  styleElement.textContent = css;
  return styleElement;
}
