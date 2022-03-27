import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunctionAllKey } from '../../require-external/require-external-function-all-key.type';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  transpileReactiveHTMLRXComponentToReactiveDOMJSLines,
} from '../rx-component/transpile-reactive-html-rx-component-to-reactive-dom-js-lines';
import {
  transpileReactiveHTMLGenericElementToReactiveDOMJSLines,
} from './transpilers/transpile-reactive-html-generic-element-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines =
  | IRequireExternalFunctionAllKey
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLElementToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLElementToReactiveDOMJSLines>;

export const transpileReactiveHTMLElementToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Element, IRequireExternalFunctionForTranspileReactiveHTMLElementToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLRXComponentToReactiveDOMJSLines,
  transpileReactiveHTMLGenericElementToReactiveDOMJSLines,
]);
