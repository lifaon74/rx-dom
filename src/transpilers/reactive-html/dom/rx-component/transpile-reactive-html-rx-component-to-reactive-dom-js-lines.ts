import { createGenericToLinesIteratorTranspilerWithAsyncReference } from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { transpileReactiveHTMLRXContainerToReactiveDOMJSLines } from './transpilers/rx-container/transpile-reactive-html-rx-container-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXForLoopToReactiveDOMJSLines } from './transpilers/rx-for-loop/transpile-reactive-html-rx-for-loop-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXIfToReactiveDOMJSLines } from './transpilers/rx-if/transpile-reactive-html-rx-if-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines } from './transpilers/rx-inject-content/transpile-reactive-html-rx-inject-content-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines } from './transpilers/rx-inject-template/transpile-reactive-html-rx-inject-template-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXScriptToReactiveDOMJSLines } from './transpilers/rx-script/transpile-reactive-html-rx-script-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXSwitchToReactiveDOMJSLines } from './transpilers/rx-switch/transpile-reactive-html-rx-switch-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXTemplateToReactiveDOMJSLines } from './transpilers/rx-template/transpile-reactive-html-rx-template-to-reactive-dom-js-lines';

export const transpileReactiveHTMLRXComponentToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[Element]>(() => [
  transpileReactiveHTMLRXTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXSwitchToReactiveDOMJSLines,
  transpileReactiveHTMLRXIfToReactiveDOMJSLines,
  transpileReactiveHTMLRXForLoopToReactiveDOMJSLines,
  transpileReactiveHTMLRXContainerToReactiveDOMJSLines,
  transpileReactiveHTMLRXScriptToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines,
  transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines,
]);
