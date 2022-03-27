import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateReactiveSwitchNodeKey,
  REQUIRE_CREATE_REACTIVE_SWITCH_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-reactive-switch-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';
import { IRequireToObservableKey, REQUIRE_TO_OBSERVABLE_CONSTANT } from '../../../../require-external/types/require-to-observable.type';
import { SWITCH_DEFAULT_NAME } from './switch-default-name.constant';
import { SWITCH_MAP_NAME } from './switch-map-name.constant';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXSwitch =
  | IRequireNodeAppendChildKey
  | IRequireCreateReactiveSwitchNodeKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForRXSwitch(
  expression: string,
  childLines: ILines,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXSwitch>,
  switchMapName: string = SWITCH_MAP_NAME,
  switchDefaultName: string = SWITCH_DEFAULT_NAME,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createReactiveSwitchNode: string = requireExternalFunction(REQUIRE_CREATE_REACTIVE_SWITCH_NODE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return scopeLines([
    `// reactive switch`,
    `const ${switchMapName} = new Map();`,  // INFO let and const are important, because they SCOPE and fix the variables
    `let ${switchDefaultName} = null;`,
    ...childLines,
    `${nodeAppendChild}(parentNode, ${createReactiveSwitchNode}(${toObservable}(${expression}), ${switchMapName}, ${switchDefaultName}));`,
  ]);
}
