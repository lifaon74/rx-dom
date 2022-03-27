import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines,
  transpileReactiveHTMLStaticTextToReactiveDOMJSLines,
} from './transpile-reactive-html-static-text-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextNodeToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines;

export function transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines(
  node: Text,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextNodeToReactiveDOMJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLStaticTextToReactiveDOMJSLines(node.data, requireExternalFunction);
}
