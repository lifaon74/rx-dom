import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines } from './transpilers/reactive-text/transpile-reactive-html-reactive-text-node-to-reactive-dom-js-lines';
import { transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines } from './transpilers/static-text/transpile-reactive-html-static-text-node-to-reactive-dom-js-lines';

export const transpileReactiveHTMLTextNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Text]>(() => [
  transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines,
]);

