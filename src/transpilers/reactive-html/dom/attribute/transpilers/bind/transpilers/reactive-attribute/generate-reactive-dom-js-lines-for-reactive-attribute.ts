import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveAttributeKey,
  REQUIRE_SET_REACTIVE_ATTRIBUTE_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-attribute.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveAttribute =
  | IRequireSetReactiveAttributeKey
  | IRequireToObservableKey
  ;

export function generateReactiveDOMJSLinesForReactiveAttribute(
  name: string,
  value: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForReactiveAttribute>,
): ILines {
  const setReactiveAttribute: string = requireExternalFunction(REQUIRE_SET_REACTIVE_ATTRIBUTE_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);
  return [
    `// reactive attribute '${name}'`,
    `${setReactiveAttribute}(${toObservable}(${value}), node, ${JSON.stringify(name)});`,
  ];
}
