import { createGenericToLinesIteratorTranspiler } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { IToLinesTranspiler } from '../../../../../types/to-lines.transpiler.type';
import {
  extractReferencePropertyFromReactiveHTMLAttribute,
  IReferenceProperty,
} from './extract-reference-property-from-reactive-html-attribute';
import { transpileReactiveHTMLDefaultReferencePropertyToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-default-reference-property-to-reactive-dom-js-lines';

export interface IReactiveHTMLReferencePropertyToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[IReferenceProperty]> {
}

export const DEFAULT_REACTIVE_HTML_REFERENCE_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLReferencePropertyToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLDefaultReferencePropertyToReactiveDOMJSLines,
];

export const transpileReactiveHTMLReferencePropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[IReferenceProperty]>(DEFAULT_REACTIVE_HTML_REFERENCE_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

export const transpileReactiveHTMLReferencePropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IReferenceProperty>(transpileReactiveHTMLReferencePropertyToReactiveDOMJSLines, extractReferencePropertyFromReactiveHTMLAttribute);

