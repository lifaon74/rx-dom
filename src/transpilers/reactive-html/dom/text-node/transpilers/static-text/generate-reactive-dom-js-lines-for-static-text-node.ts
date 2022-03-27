import { ILines } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireCreateTextNodeKey,
  REQUIRE_CREATE_TEXT_NODE_CONSTANT,
} from '../../../../require-external/types/require-create-text-node.type';
import {
  IRequireNodeAppendChildKey,
  REQUIRE_NODE_APPEND_CHILD_CONSTANT,
} from '../../../../require-external/types/require-node-append-child.type';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode =
  | IRequireNodeAppendChildKey
  | IRequireCreateTextNodeKey
  ;

export function generateReactiveDOMJSLinesForStaticTextNode(
  text: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForStaticTextNode>,
): ILines {
  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);
  const createTextNode: string = requireExternalFunction(REQUIRE_CREATE_TEXT_NODE_CONSTANT);
  return [
    `// static text node`,
    `${nodeAppendChild}(parentNode, ${createTextNode}(${JSON.stringify(text)}));`,
  ];
}
