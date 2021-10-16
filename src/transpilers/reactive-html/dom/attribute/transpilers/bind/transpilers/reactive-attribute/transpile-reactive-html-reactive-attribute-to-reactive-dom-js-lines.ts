import { ILinesOrNull } from '../../../../../../../types/lines.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForReactiveAttribute } from './generate-reactive-dom-js-lines-for-reactive-attribute';

const REACTIVE_ATTRIBUTE_STANDARD_REGEXP: RegExp = new RegExp('^attr\\.(.*)$');
const REACTIVE_ATTRIBUTE_PREFIXED_REGEXP: RegExp = new RegExp('^attr-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [attr.my-attr]="'attr-value'"
 *    [attr...]="{ 'my-attr': 'attr-value' }"
 *
 *  - prefixed:
 *    bind-attr-my-attr="'attr-value'"
 *    bind-attr---="{ 'my-attr': 'attr-value' }"
 */
export function transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines(
  bindProperty: IBindProperty,
): ILinesOrNull {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_ATTRIBUTE_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_ATTRIBUTE_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let attributeName: string = match[1];

    if (bindProperty.prefixMode && (attributeName === '--')) {
      attributeName = '..';
    }

    if (attributeName === '..') {
      throw new Error(`TODO`); // TODO
    }

    return generateReactiveDOMJSLinesForReactiveAttribute(attributeName, bindProperty.value);
  }
}

