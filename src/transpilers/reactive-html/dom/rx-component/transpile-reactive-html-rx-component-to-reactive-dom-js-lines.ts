import { createGenericToLinesIteratorTranspiler } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler';
import { IToLinesTranspiler } from '../../../types/to-lines.transpiler.type';
import { transpileReactiveHTMLRXScriptToReactiveDOMJSLines } from './transpilers';
import { transpileReactiveHTMLRXContainerToReactiveDOMJSLines } from './transpilers/rx-container/transpile-reactive-html-rx-container-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXForLoopToReactiveDOMJSLines } from './transpilers/rx-for-loop/transpile-reactive-html-rx-for-loop-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXIfToReactiveDOMJSLines } from './transpilers/rx-if/transpile-reactive-html-rx-if-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines } from './transpilers/rx-inject-content/transpile-reactive-html-rx-inject-content-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines } from './transpilers/rx-inject-template/transpile-reactive-html-rx-inject-template-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXSwitchToReactiveDOMJSLines } from './transpilers/rx-switch/transpile-reactive-html-rx-switch-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXTemplateToReactiveDOMJSLines } from './transpilers/rx-template/transpile-reactive-html-rx-template-to-reactive-dom-js-lines';

export interface IReactiveHTMLRXComponentToReactiveDOMJSLinesTranspiler extends IToLinesTranspiler<[Element]> {
}

export const DEFAULT_REACTIVE_HTML_RX_COMPONENT_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS: IReactiveHTMLRXComponentToReactiveDOMJSLinesTranspiler[] = [
  transpileReactiveHTMLRXTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXSwitchToReactiveDOMJSLines,
  transpileReactiveHTMLRXIfToReactiveDOMJSLines,
  transpileReactiveHTMLRXForLoopToReactiveDOMJSLines,
  transpileReactiveHTMLRXContainerToReactiveDOMJSLines,
  transpileReactiveHTMLRXScriptToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines,
];

export const transpileReactiveHTMLRXComponentToReactiveDOMJSLines = createGenericToLinesIteratorTranspiler<[Element]>(DEFAULT_REACTIVE_HTML_RX_COMPONENT_TO_REACTIVE_DOM_JS_LINES_TRANSPILERS);
