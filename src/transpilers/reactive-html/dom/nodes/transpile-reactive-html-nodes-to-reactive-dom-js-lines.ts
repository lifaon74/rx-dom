import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLGenericNodesToReactiveDOMJSLines } from './transpilers/transpile-reactive-html-generic-nodes-to-reactive-dom-js-lines';

export interface IReactiveHTMLNodesToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[ArrayLike<Node>]> {
}

export const DEFAULT_REACTIVE_HTML_NODES_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLNodesToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLGenericNodesToReactiveDOMJSLines,
];

export const transpileReactiveHTMLNodesToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[ArrayLike<Node>]>(DEFAULT_REACTIVE_HTML_NODES_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);


