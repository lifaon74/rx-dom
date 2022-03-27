import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveStyleListKey,
  REQUIRE_SET_REACTIVE_STYLE_LIST_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-style-list.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveStyleList =
  | IRequireSetReactiveStyleListKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForReactiveStyleList(
  value: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveStyleList>,
): ILines {
  const setReactiveStyleList: string = requireExternalFunction(REQUIRE_SET_REACTIVE_STYLE_LIST_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive style list`,
    `${setReactiveStyleList}(${toObservable}(${value}), node);`,
  ];
}
