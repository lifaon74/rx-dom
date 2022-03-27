import {
  createGenericToLinesIteratorTranspilerWithAsyncReference,
} from '../../../helpers/iterator-transpiler/create-generic-to-lines-iterator-transpiler-with-async-reference';
import { IRequireExternalFunction } from '../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericAttributesToReactiveDOMJSLines,
  transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines,
} from './transpilers/transpile-reactive-htm--generic-attributes-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributesToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericAttributesToReactiveDOMJSLines
  ;

type IRequireExternalFunctionForTranspileReactiveHTMLAttributesToReactiveDOMJSLines = IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributesToReactiveDOMJSLines>;

export const transpileReactiveHTMLAttributesToReactiveDOMJSLines = createGenericToLinesIteratorTranspilerWithAsyncReference<[ArrayLike<Attr>, IRequireExternalFunctionForTranspileReactiveHTMLAttributesToReactiveDOMJSLines]>(() => [
  transpileReactiveHTMLGenericAttributesToReactiveDOMJSLines,
]);

