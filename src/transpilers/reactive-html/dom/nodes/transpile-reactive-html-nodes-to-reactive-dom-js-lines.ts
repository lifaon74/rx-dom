import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodesToReactiveDOMJSLines,
  transpileReactiveHTMLGenericNodesToReactiveDOMJSLines,
} from './transpilers/transpile-reactive-html-generic-nodes-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericNodesToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLNodesToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines>;

export const transpileReactiveHTMLNodesToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[ArrayLike<Node>, IRequireExternalFunctionForTranspileReactiveHTMLNodesToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLGenericNodesToReactiveDOMJSLines,
]);


