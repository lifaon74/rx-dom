import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactivePropertyPathKey,
  REQUIRE_SET_REACTIVE_PROPERTY_PATH_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-property-path.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines =
  | IRequireSetReactivePropertyPathKey
  | IRequireToObservableKey
  ;

export function transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines(
  bindProperty: IBindProperty,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines>,
): ILines {
  const path: string[] = bindProperty.name.split(bindProperty.prefixMode ? '-' : '.');

  const setReactivePropertyPath: string = requireExternalFunction(REQUIRE_SET_REACTIVE_PROPERTY_PATH_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);

  return [
    `// reactive property '${bindProperty.name}'`,
    `${setReactivePropertyPath}(${toObservable}(${bindProperty.value}), node, ${JSON.stringify(path)});`,
  ];
}

