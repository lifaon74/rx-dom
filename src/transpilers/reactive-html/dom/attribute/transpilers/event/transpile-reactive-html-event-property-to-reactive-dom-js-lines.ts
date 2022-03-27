import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import {
  wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter,
} from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import { extractEventPropertyFromReactiveHTMLAttribute, IEventProperty } from './extract-event-property-from-reactive-html-attribute';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines,
} from './transpilers/transpile-reactive-html-reactive-event-listener-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines>;

export const transpileReactiveHTMLEventPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[IEventProperty, IRequireExternalFunctionForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines,
]);

export const transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IEventProperty, [IRequireExternalFunctionForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines]>(transpileReactiveHTMLEventPropertyToReactiveDOMJSLines, extractEventPropertyFromReactiveHTMLAttribute);

