import { setAttributeValue } from '../../../light-dom/attribute/set-attribute-value';

/**
 * Activates an HTMLStyleElement
 */
export function activateStyleElement(
  styleElement: HTMLStyleElement,
  activate: boolean,
): void {
  (styleElement.sheet as StyleSheet).disabled = !activate;
  setAttributeValue(styleElement, 'disabled', activate ? null : '');
}
