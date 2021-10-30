import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLGenericNodeToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-node-to-reactive-dom-js-lines';

export const transpileReactiveHTMLNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Node]>(() => [
  transpileReactiveHTMLGenericNodeToReactiveDOMJSLines,
]);




