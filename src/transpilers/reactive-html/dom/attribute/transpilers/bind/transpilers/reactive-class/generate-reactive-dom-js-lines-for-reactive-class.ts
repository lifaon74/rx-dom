import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveClassKey,
  REQUIRE_SET_REACTIVE_CLASS_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-class.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveClass =
  | IRequireSetReactiveClassKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForReactiveClass(
  name: string,
  value: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveClass>,
): ILines {
  const setReactiveClass: string = requireExternalFunction(REQUIRE_SET_REACTIVE_CLASS_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive class '${name}'`,
    `${setReactiveClass}(${toObservable}(${value}), node, ${JSON.stringify(name)});`,
  ];
}
