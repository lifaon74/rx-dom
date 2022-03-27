import { ILinesOrNull } from '../../../../../types/lines.type';
import {
  extractModifierPropertyFromReactiveHTMLAttribute,
  IModifierProperty,
} from './extract-modifier-property-from-reactive-html-attribute';
import {
  transpileReactiveHTMLModifierPropertyToReactiveDOMJSLines,
} from './transpile-reactive-html-modifier-property-to-reactive-dom-js-lines';

export function transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines(
  attribute: Attr,
): ILinesOrNull {
  const modifierProperty: IModifierProperty | null = extractModifierPropertyFromReactiveHTMLAttribute(attribute);
  return (modifierProperty === null)
    ? null
    : transpileReactiveHTMLModifierPropertyToReactiveDOMJSLines(modifierProperty);
}
