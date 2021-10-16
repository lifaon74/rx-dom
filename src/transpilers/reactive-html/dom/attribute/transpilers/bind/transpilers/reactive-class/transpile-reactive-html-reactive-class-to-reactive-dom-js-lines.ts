import { isValidCSSIdentifier } from '../../../../../../../../misc/tokenizers/css';
import { ILinesOrNull } from '../../../../../../../types/lines.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForReactiveClass } from './generate-reactive-dom-js-lines-for-reactive-class';
import { generateReactiveDOMJSLinesForReactiveClassList } from './generate-reactive-dom-js-lines-for-reactive-class-list';

const REACTIVE_CLASS_STANDARD_REGEXP: RegExp = new RegExp('^class\\.(.*)$');
const REACTIVE_CLASS_PREFIXED_REGEXP: RegExp = new RegExp('^class-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [class.class-a]="boolean"
 *    [class...]="['class-a', 'class-b']"
 *
 *  - prefixed:
 *    bind-class-class-a="boolean"
 *    bind-class---="['class-a', 'class-b']"
 */
export function transpileReactiveHTMLReactiveClassToReactiveDOMJSLines(
  bindProperty: IBindProperty,
): ILinesOrNull {
  const match: RegExpExecArray | null = bindProperty.prefixMode
    ? REACTIVE_CLASS_PREFIXED_REGEXP.exec(bindProperty.name)
    : REACTIVE_CLASS_STANDARD_REGEXP.exec(bindProperty.name);

  if (match === null) {
    return null;
  } else {
    let className: string = match[1];

    if (bindProperty.prefixMode && (className === '--')) {
      className = '..';
    }

    if ((className !== '..') && !isValidCSSIdentifier(className)) {
      throw new Error(`Invalid className '${className}'`);
    }

    return (className === '..')
      ? generateReactiveDOMJSLinesForReactiveClassList(bindProperty.value)
      : generateReactiveDOMJSLinesForReactiveClass(className, bindProperty.value);
  }
}

