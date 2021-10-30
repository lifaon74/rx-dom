import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLGenericNodesToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-nodes-to-reactive-dom-js-lines';

export const transpileReactiveHTMLNodesToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[ArrayLike<Node>]>(() => [
  transpileReactiveHTMLGenericNodesToReactiveDOMJSLines,
]);


