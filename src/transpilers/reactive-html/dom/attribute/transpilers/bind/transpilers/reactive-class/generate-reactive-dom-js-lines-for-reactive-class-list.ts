import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveClassListKey,
  REQUIRE_SET_REACTIVE_CLASS_LIST_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-class-list.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveClassList =
  | IRequireSetReactiveClassListKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForReactiveClassList(
  value: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveClassList>,
): ILines {
  const setReactiveClassList: string = requireExternalFunction(REQUIRE_SET_REACTIVE_CLASS_LIST_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive class list`,
    `${setReactiveClassList}(${toObservable}(${value}), node);`,
  ];
}
