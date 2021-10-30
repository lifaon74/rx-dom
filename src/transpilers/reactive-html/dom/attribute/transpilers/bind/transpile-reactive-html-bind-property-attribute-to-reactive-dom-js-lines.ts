import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { extractBindPropertyFromReactiveHTMLAttribute, IBindProperty } from './extract-bind-property-from-reactive-html-attribute';
import { transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines } from './transpilers/reactive-attribute/transpile-reactive-html-reactive-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactiveClassToReactiveDOMJSLines } from './transpilers/reactive-class/transpile-reactive-html-reactive-class-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines } from './transpilers/reactive-property/transpile-reactive-html-reactive-property-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines } from './transpilers/reactive-style/transpile-reactive-html-reactive-style-to-reactive-dom-js-lines';

export const transpileReactiveHTMLBindPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[IBindProperty]>(() => [
  transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveClassToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines,
  transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines,
]);

export const transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IBindProperty>(transpileReactiveHTMLBindPropertyToReactiveDOMJSLines, extractBindPropertyFromReactiveHTMLAttribute);
