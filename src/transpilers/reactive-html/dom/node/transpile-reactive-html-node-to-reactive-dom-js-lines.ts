import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodeToReactiveDOMJSLines,
  transpileReactiveHTMLGenericNodeToReactiveDOMJSLines,
} from './transpilers/transpile-reactive-html-generic-node-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLNodeToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodeToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLNodeToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLNodeToReactiveDOMJSLines>;

export const transpileReactiveHTMLNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Node, IRequireExternalFunctionForTranspileReactiveHTMLNodeToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLGenericNodeToReactiveDOMJSLines,
]);




