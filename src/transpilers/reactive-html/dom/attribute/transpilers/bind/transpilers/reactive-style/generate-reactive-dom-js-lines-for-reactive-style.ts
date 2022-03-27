import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveStyleKey,
  REQUIRE_SET_REACTIVE_STYLE_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-style.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveStyle =
  | IRequireSetReactiveStyleKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForReactiveStyle(
  name: string,
  value: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveStyle>,
): ILines {
  const setReactiveStyle: string = requireExternalFunction(REQUIRE_SET_REACTIVE_STYLE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive style '${name}'`,
    `${setReactiveStyle}(${toObservable}(${value}), node, ${JSON.stringify(name)});`,
  ];
}
