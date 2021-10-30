import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines } from './transpilers/transpile-reactive-htm--generic-attributes-to-reactive-dom-js-lines';

export const transpileReactiveHTMLAttributesToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[ArrayLike<Attr>]>(() => [
  transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines,
]);

