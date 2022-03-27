import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveForLoopNodeKey,
  REQUIRE_CREATE_REACTIVE_FOR_LOOP_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-for-loop-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXForLoop =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveForLoopNodeKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForRXForLoop(
  items: string,
  template: string,
  options: ILinesOrNull,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXForLoop>,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveForLoopNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_FOR_LOOP_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive for loop`,
    `${nodeAppendChild}(`,
    ...indentLines([
      `parentNode,`,
      `${createReactiveForLoopNode}(`,
      ...indentLines([
        `${toObservable}(${items}),`,
        `${template},`,
        ...optionalLines(options),
      ]),
      `)`,
    ]),
    `);`,
  ];
}
