import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXContainerToReactiveDOMJSLines,
  transpileReactiveHTMLRXContainerToReactiveDOMJSLines,
} from './transpilers/rx-container/transpile-reactive-html-rx-container-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXForLoopToReactiveDOMJSLines,
  transpileReactiveHTMLRXForLoopToReactiveDOMJSLines,
} from './transpilers/rx-for-loop/transpile-reactive-html-rx-for-loop-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines,
  transpileReactiveHTMLRXIfToReactiveDOMJSLines,
} from './transpilers/rx-if/transpile-reactive-html-rx-if-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines,
} from './transpilers/rx-inject-content/transpile-reactive-html-rx-inject-content-to-reactive-dom-js-lines';
import {
  transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines,
} from './transpilers/rx-inject-template/transpile-reactive-html-rx-inject-template-to-reactive-dom-js-lines';
import {
  transpileReactiveHTMLRXScriptToReactiveDOMJSLines,
} from './transpilers/rx-script/transpile-reactive-html-rx-script-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXSwitchToReactiveDOMJSLines,
  transpileReactiveHTMLRXSwitchToReactiveDOMJSLines,
} from './transpilers/rx-switch/transpile-reactive-html-rx-switch-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXTemplateToReactiveDOMJSLines,
} from './transpilers/rx-template/transpile-reactive-html-rx-template-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXComponentToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXTemplateToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXSwitchToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXForLoopToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXContainerToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLRXComponentToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXComponentToReactiveDOMJSLines>;

export const transpileReactiveHTMLRXComponentToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Element, IRequireExternalFunctionForTranspileReactiveHTMLRXComponentToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLRXTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXSwitchToReactiveDOMJSLines,
  transpileReactiveHTMLRXIfToReactiveDOMJSLines,
  transpileReactiveHTMLRXForLoopToReactiveDOMJSLines,
  transpileReactiveHTMLRXContainerToReactiveDOMJSLines,
  transpileReactiveHTMLRXScriptToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines,
]);
