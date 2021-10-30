import { ILines } from '../../../../../types/lines.type';
import { IModifierProperty } from '../../../attribute/transpilers/modifier/extract-modifier-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForModifierProperty } from '../../../attribute/transpilers/modifier/generate-reactive-dom-js-lines-for-modifier-property';
import { extractModifierPropertiesFromReactiveHTMLAttributes } from './extract-modifier-properties-from-reactive-html-attributes';

export function transpileReactiveHTMLElementModifiersToReactiveDOMJSLines(
  node: Element,
  lines: ILines,
): ILines {
  const modifiers: IModifierProperty[] = extractModifierPropertiesFromReactiveHTMLAttributes(Array.from(node.attributes));
  return modifiers.reduce((lines: ILines, modifierProperty: IModifierProperty): ILines => {
    return generateReactiveDOMJSLinesForModifierProperty(modifierProperty, lines);
  }, lines);
}

