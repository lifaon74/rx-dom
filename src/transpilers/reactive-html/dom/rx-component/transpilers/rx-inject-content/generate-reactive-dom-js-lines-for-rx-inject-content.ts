import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveContentNodeKey,
  REQUIRE_CREATE_REACTIVE_CONTENT_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-content-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXInjectContent =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveContentNodeKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForRXInjectContent(
  content: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXInjectContent>,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveContentNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_CONTENT_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive content`,
    `${nodeAppendChild}(parentNode, ${createReactiveContentNode}(${toObservable}(${content})));`,
  ];
}
