import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines,
} from './transpilers/reactive-text/transpile-reactive-html-reactive-text-node-to-reactive-dom-js-lines';
import {
  transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines,
} from './transpilers/static-text/transpile-reactive-html-static-text-node-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines,
} from './transpilers/static-text/transpile-reactive-html-static-text-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticTextToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines>;

export const transpileReactiveHTMLTextNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Text, IRequireExternalFunctionForTranspileReactiveHTMLTextNodeToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines,
]);

