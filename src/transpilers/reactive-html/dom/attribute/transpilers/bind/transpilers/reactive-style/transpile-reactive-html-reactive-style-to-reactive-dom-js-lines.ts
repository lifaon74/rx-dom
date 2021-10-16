import { ILinesOrNull } from '../../../../../../../types/lines.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForReactiveStyle } from './generate-reactive-dom-js-lines-for-reactive-style';
import { generateReactiveDOMJSLinesForReactiveStyleList } from './generate-reactive-dom-js-lines-for-reactive-style-list';

const REACTIVE_STYLE_STANDARD_REGEXP: RegExp = new RegExp('^style\\.(.*)$');
const REACTIVE_STYLE_PREFIXED_REGEXP: RegExp = new RegExp('^style-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [style.font-size]="'12px'"
 *    [style...]="{ color: 'blue' }"
 *
 *  - prefixed:
 *    bind-style-font-size="'12px'"
 *    bind-style---="{ color: 'blue' }"
 */
export function transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines(
  bindProperty: IBindProperty,
): ILinesOrNull {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_STYLE_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_STYLE_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let styleName: string = match[1];

    if (bindProperty.prefixMode && (styleName === '--')) {
      styleName = '..';
    }

    return (styleName === '..')
      ? generateReactiveDOMJSLinesForReactiveStyleList(bindProperty.value)
      : generateReactiveDOMJSLinesForReactiveStyle(styleName, bindProperty.value);
  }
}

