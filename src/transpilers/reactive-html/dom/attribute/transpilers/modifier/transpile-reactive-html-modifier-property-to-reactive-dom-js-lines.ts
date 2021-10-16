import { ILines } from '../../../../../types/lines.type';
import { IModifierProperty } from './extract-modifier-property-from-reactive-html-attribute';

/**
 * INFO: this function returns empty lines because the modifierProperty must be directly handled on the node level
 */
export function transpileReactiveHTMLModifierPropertyToReactiveDOMJSLines(
  modifierProperty: IModifierProperty,
): ILines {
  return [];
}


