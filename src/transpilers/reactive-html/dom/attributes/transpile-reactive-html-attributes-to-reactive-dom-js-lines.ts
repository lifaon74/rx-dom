import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines } from './transpilers/transpile-reactive-htm--generic-attributes-to-reactive-dom-js-lines';

export interface IReactiveHTMLAttributesToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[ArrayLike<Attr>]> {
}

export const DEFAULT_REACTIVE_HTML_ATTRIBUTES_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLAttributesToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines,
];

export const transpileReactiveHTMLAttributesToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[ArrayLike<Attr>]>(DEFAULT_REACTIVE_HTML_ATTRIBUTES_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);

