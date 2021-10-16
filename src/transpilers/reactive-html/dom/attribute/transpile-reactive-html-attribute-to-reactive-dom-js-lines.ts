import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines } from './transpilers/bind/transpile-reactive-html-bind-property-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines } from './transpilers/event/transpile-reactive-html-event-property-to-reactive-dom-js-lines';
import { transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines } from './transpilers/modifier/transpile-reactive-html-modifier-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReferencePropertyAttributeToReactiveDOMJSLines } from './transpilers/reference/transpile-reactive-html-reference-property-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines } from './transpilers/static/transpile-reactive-html-static-attribute-to-reactive-dom-js-lines';

export interface IReactiveHTMLAttributeToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[Attr]> {
}

export const DEFAULT_REACTIVE_HTML_ATTRIBUTE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLAttributeToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLReferencePropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLEventPropertyAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLModifierAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines,
];

export const transpileReactiveHTMLAttributeToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[Attr]>(DEFAULT_REACTIVE_HTML_ATTRIBUTE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

