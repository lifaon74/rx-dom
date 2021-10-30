import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLRXComponentToReactiveDOMJSLines } from '../rx-component/transpile-reactive-html-rx-component-to-reactive-dom-js-lines';
import { transpileReactiveHTMLGenericElementToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-element-to-reactive-dom-js-lines';

export const transpileReactiveHTMLElementToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Element]>(() => [
  transpileReactiveHTMLRXComponentToReactiveDOMJSLines,
  transpileReactiveHTMLGenericElementToReactiveDOMJSLines,
]);
