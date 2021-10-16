import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers';
import { createGenericToLinesIteratorTranspiler } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../../../types/to-lines.transpiler.type';
import { extractEventPropertyFromReactiveHTMLAttribute, IEventProperty } from './extract-event-property-from-reactive-html-attribute';
import { transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-reactive-event-listener-to-reactive-dom-js-lines';

export interface IReactiveHTMLEventPropertyToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[IEventProperty]> {
}

export const DEFAULT_REACTIVE_HTML_EVENT_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLEventPropertyToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines,
];

export const transpileReactiveHTMLEventPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[IEventProperty]>(DEFAULT_REACTIVE_HTML_EVENT_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

export const transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IEventProperty>(transpileReactiveHTMLEventPropertyToReactiveDOMJSLines, extractEventPropertyFromReactiveHTMLAttribute);

