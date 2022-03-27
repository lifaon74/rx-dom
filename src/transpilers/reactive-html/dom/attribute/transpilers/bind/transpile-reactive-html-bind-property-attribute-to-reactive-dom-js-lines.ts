import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import {
  wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter,
} from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import { extractBindPropertyFromReactiveHTMLAttribute, IBindProperty } from './extract-bind-property-from-reactive-html-attribute';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines,
} from './transpilers/reactive-attribute/transpile-reactive-html-reactive-attribute-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveClassToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveClassToReactiveDOMJSLines,
} from './transpilers/reactive-class/transpile-reactive-html-reactive-class-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines,
  transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines,
} from './transpilers/reactive-property/transpile-reactive-html-reactive-property-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveStyleToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines,
} from './transpilers/reactive-style/transpile-reactive-html-reactive-style-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveAttributeToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveClassToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveStyleToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines>;

export const transpileReactiveHTMLBindPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[IBindProperty, IRequireExternalFunctionForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveClassToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines,
  transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines,
]);

export const transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IBindProperty, [IRequireExternalFunctionForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines]>(transpileReactiveHTMLBindPropertyToReactiveDOMJSLines, extractBindPropertyFromReactiveHTMLAttribute);
