import { nullIfEmptyLines } from '../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { transpileReactiveHTMLAttributeToReactiveDOMJSLines } from '../../attribute/transpile-reactive-html-attribute-to-reactive-dom-js-lines';

export function transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines(
  attributes: ArrayLike<Attr>,
): ILinesOrNull {
  const lines: ILines = [];
  for (let i = 0, l = attributes.length; i < l; i++) {
    const result: ILinesOrNull = transpileReactiveHTMLAttributeToReactiveDOMJSLines(attributes[i]);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}

