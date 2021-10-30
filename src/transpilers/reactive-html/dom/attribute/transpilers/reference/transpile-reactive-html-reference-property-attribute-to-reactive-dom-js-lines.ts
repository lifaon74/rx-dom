import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import {
  extractReferencePropertyFromReactiveHTMLAttribute,
  IReferenceProperty,
} from './extract-reference-property-from-reactive-html-attribute';
import { transpileReactiveHTMLDefaultReferencePropertyToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-default-reference-property-to-reactive-dom-js-lines';

export const transpileReactiveHTMLReferencePropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[IReferenceProperty]>(() => [
  transpileReactiveHTMLDefaultReferencePropertyToReactiveDOMJSLines,
]);

export const transpileReactiveHTMLReferencePropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IReferenceProperty>(transpileReactiveHTMLReferencePropertyToReactiveDOMJSLines, extractReferencePropertyFromReactiveHTMLAttribute);

