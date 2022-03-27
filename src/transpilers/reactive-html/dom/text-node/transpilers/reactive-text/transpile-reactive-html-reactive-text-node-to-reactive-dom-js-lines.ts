import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveTextToReactiveDOMJSLines,
} from './transpile-reactive-html-reactive-text-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextToReactiveDOMJSLines;

export function transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines(
  node: Text,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLReactiveTextToReactiveDOMJSLines(node.data, requireExternalFunction);
}

