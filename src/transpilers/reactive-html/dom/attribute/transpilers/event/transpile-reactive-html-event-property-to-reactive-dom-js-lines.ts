import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { extractEventPropertyFromReactiveHTMLAttribute, IEventProperty } from './extract-event-property-from-reactive-html-attribute';
import { transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-reactive-event-listener-to-reactive-dom-js-lines';

export const transpileReactiveHTMLEventPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[IEventProperty]>(() => [
  transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines,
]);

export const transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IEventProperty>(transpileReactiveHTMLEventPropertyToReactiveDOMJSLines, extractEventPropertyFromReactiveHTMLAttribute);

