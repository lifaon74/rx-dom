import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  generateReactiveDOMJSLinesForStaticTextNode,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode,
} from './generate-reactive-dom-js-lines-for-static-text-node';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines = IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode;

export function transpileReactiveHTMLStaticTextToReactiveDOMJSLines(
  text: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines>,
): ILinesOrNull {
  return (text === '')
    ? null
    : generateReactiveDOMJSLinesForStaticTextNode(text, requireExternalFunction);
}
