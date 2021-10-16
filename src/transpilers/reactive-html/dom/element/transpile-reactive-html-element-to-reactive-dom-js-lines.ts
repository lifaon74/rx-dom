import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLRXComponentToReactiveDOMJSLines } from '../rx-component/transpile-reactive-html-rx-component-to-reactive-dom-js-lines';
import { transpileReactiveHTMLGenericElementToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-element-to-reactive-dom-js-lines';

export interface IReactiveHTMLElementToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[Element]> {
}

export const DEFAULT_REACTIVE_HTML_ELEMENT_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLElementToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLRXComponentToReactiveDOMJSLines,
  transpileReactiveHTMLGenericElementToReactiveDOMJSLines,
];

export const transpileReactiveHTMLElementToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[Element]>(DEFAULT_REACTIVE_HTML_ELEMENT_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);
