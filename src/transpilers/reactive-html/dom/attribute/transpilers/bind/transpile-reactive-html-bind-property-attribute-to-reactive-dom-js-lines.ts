import { createGenericToLinesIteratorTranspiler } from '../../../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter } from '../../../../../helpers/iterator-transpiler/wrap-generic-to-lines-iterator-transpiler-with-optional-value-converter';
import { IToLinesTranspiler } from '../../../../../types/to-lines.transpiler.type';
import { extractBindPropertyFromReactiveHTMLAttribute, IBindProperty } from './extract-bind-property-from-reactive-html-attribute';
import { transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines } from './transpilers/reactive-attribute/transpile-reactive-html-reactive-attribute-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactiveClassToReactiveDOMJSLines } from './transpilers/reactive-class/transpile-reactive-html-reactive-class-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines } from './transpilers/reactive-property/transpile-reactive-html-reactive-property-to-reactive-dom-js-lines';
import { transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines } from './transpilers/reactive-style/transpile-reactive-html-reactive-style-to-reactive-dom-js-lines';

export interface IReactiveHTMLBindPropertyToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[IBindProperty]> {
}

export const DEFAULT_REACTIVE_HTML_BIND_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLBindPropertyToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLReactiveAttributeToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveClassToReactiveDOMJSLines,
  transpileReactiveHTMLReactiveStyleToReactiveDOMJSLines,
  transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines,
];

export const transpileReactiveHTMLBindPropertyToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[IBindProperty]>(DEFAULT_REACTIVE_HTML_BIND_PROPERTY_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

export const transpileReactiveHTMLBindPropertyAttributeToReactiveDOMJSLines = wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<Attr, IBindProperty>(transpileReactiveHTMLBindPropertyToReactiveDOMJSLines, extractBindPropertyFromReactiveHTMLAttribute);
