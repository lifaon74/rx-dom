import { nullIfEmptyLines } from '../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLAttributeToReactiveDOMJSLines,
} from '../../attribute/transpile-reactive-html-attribute-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericAttributesToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributeToReactiveDOMJSLines;

export function transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines(
  attributes: ArrayLike<Attr>,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericAttributesToReactiveDOMJSLines>,
): ILinesOrNull {
  const lines: ILines = [];
  for (let i = 0, l = attributes.length; i < l; i++) {
    const result: ILinesOrNull = transpileReactiveHTMLAttributeToReactiveDOMJSLines(attributes[i], requireExternalFunction);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}

