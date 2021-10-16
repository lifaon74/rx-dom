import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLGenericNodeToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-node-to-reactive-dom-js-lines';

export interface IReactiveHTMLNodeToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[Node]> {
}

export const DEFAULT_REACTIVE_HTML_NODE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLNodeToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLGenericNodeToReactiveDOMJSLines,
];

export const transpileReactiveHTMLNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[Node]>(DEFAULT_REACTIVE_HTML_NODE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);




