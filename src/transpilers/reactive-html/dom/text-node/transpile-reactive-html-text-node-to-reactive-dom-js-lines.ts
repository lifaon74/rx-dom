import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines } from './transpilers/reactive-text/transpile-reactive-html-reactive-text-node-to-reactive-dom-js-lines';
import { transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines } from './transpilers/static-text/transpile-reactive-html-static-text-node-to-reactive-dom-js-lines';

export interface IReactiveHTMLTextNodeToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[Text]> {
}

export const DEFAULT_REACTIVE_HTML_TEXT_NODE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLTextNodeToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLReactiveTextNodeToReactiveDOMJSLines,
  transpileReactiveHTMLStaticTextNodeToReactiveDOMJSLines,
];

export const transpileReactiveHTMLTextNodeToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[Text]>(DEFAULT_REACTIVE_HTML_TEXT_NODE_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

