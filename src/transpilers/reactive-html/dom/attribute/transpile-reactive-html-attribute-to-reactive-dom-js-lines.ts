import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines,
  transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines,
} from './transpilers/bind/transpile-reactive-html-bind-property-attribute-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines,
  transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines,
} from './transpilers/event/transpile-reactive-html-event-property-to-reactive-dom-js-lines';
import {
  transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines,
} from './transpilers/modifier/transpile-reactive-html-modifier-attribute-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines,
} from './transpilers/static/transpile-reactive-html-static-attribute-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributeToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLBindPropertyToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLEventPropertyToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticAttributeToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLAttributeToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributeToReactiveDOMJSLines>;

export const transpileReactiveHTMLAttributeToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Attr, IRequireExternalFunctionForTranspileReactiveHTMLAttributeToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines,
]);

