import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines } from './transpilers/bind/transpile-reactive-html-bind-property-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines } from './transpilers/event/transpile-reactive-html-event-property-to-reactive-dom-js-lines';
import { transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines } from './transpilers/modifier/transpile-reactive-html-modifier-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines } from './transpilers/static/transpile-reactive-html-static-attribute-to-reactive-dom-js-lines';

export const transpileReactiveHTMLAttributeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Attr]>(() => [
  transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines,
]);

