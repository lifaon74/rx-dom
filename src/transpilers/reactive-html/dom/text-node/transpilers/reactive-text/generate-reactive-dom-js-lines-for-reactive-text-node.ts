import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveTextNodeKey,
  REQUIRE_CREATE_REACTIVE_TEXT_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-text-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveTextNode =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveTextNodeKey
  | IRequireToObservableKey
  ;

export type IRequireExternalFunctionForGenerateReactiveDOMJSLinesForReactiveTextNode = IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveTextNode>;

export function generateReactiveDOMJSLinesForReactiveTextNode(
  value: string,
  requireExternalFunction: IRequireExternalFunctionForGenerateReactiveDOMJSLinesForReactiveTextNode,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveTextNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_TEXT_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive text node`,
    `${nodeAppendChild}(parentNode, ${createReactiveTextNode}(${toObservable}(${value})));`,
  ];
}
