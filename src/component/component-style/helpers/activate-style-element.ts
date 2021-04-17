import { setAttributeValue } from '../../../light-dom/attribute/set-attribute-value';

/**
 * Activates an HTMLStyleElement
 */
export function activateStyleElement(
  styleElement: HTMLStyleElement,
  activate: boolean,
): void {
  setAttributeValue(styleElement, 'disabled', activate ? null : '');
  if (styleElement.sheet !== null) {
    styleElement.sheet.disabled = !activate;
  }
}
