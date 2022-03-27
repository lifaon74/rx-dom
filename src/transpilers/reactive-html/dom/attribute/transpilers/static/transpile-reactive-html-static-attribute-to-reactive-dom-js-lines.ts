import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireSetAttributeValueKey,
  REQUIRE_SET_ATTRIBUTE_VALUE_CONSTANT,
} from '../../../../require-external/types/require-set-attribute-value.type';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticAttributeToReactiveDOMJSLines =
  | IRequireSetAttributeValueKey
  ;

export function transpileReactiveHTMLStaticAttributeToReactiveDOMJSLines(
  attribute: Attr,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLStaticAttributeToReactiveDOMJSLines>,
): ILinesOrNull {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_SET_ATTRIBUTE_VALUE_CONSTANT);
  return (attribute.name === 'is')
    ? null
    : [
      `// static attribute '${attribute.name}'`,
      `${nodeAppendChild}(node, ${JSON.stringify(attribute.name)}, ${JSON.stringify(attribute.value)});`,
    ];
}

