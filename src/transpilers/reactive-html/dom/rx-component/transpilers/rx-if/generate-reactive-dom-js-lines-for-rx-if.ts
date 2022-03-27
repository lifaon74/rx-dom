import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveIfNodeKey,
  REQUIRE_CREATE_REACTIVE_IF_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-if-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveIfNodeKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForRXIf(
  condition: string,
  templateTrue: string,
  templateFalse: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf>,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveIfNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_IF_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive if`,
    `${nodeAppendChild}(parentNode, ${createReactiveIfNode}(${toObservable}(${condition}), ${templateTrue}, ${templateFalse}));`,
  ];
}
