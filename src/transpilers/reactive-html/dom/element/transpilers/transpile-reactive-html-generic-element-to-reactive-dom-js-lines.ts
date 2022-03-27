import { IAttributeValueOrNull } from '../../../../../light-dom/attribute/attribute-value.type';
import { getAttributeValue } from '../../../../../light-dom/attribute/get-attribute-value';
import { ICreateElementOptions } from '../../../../../light-dom/node/create/element-node/create-element';
import { getChildNodes } from '../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../light-dom/node/properties/get-tag-name';
import { scopeLines } from '../../../../helpers/lines-formatting-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { IRequireExternalFunctionCreateElementKey } from '../../../require-external/require-external-function-all-key.type';
import { IRequireExternalFunction } from '../../../require-external/require-external-function.type';
import { REQUIRE_NODE_APPEND_CHILD_CONSTANT } from '../../../require-external/types/require-node-append-child.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributesToReactiveDOMJSLines,
  transpileReactiveHTMLAttributesToReactiveDOMJSLines,
} from '../../attributes/transpile-reactive-html-attributes-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines,
  transpileReactiveHTMLNodesToReactiveDOMJSLines,
} from '../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { getCreateElementFunctionNameForElement } from './get-create-element-function-name-for-element';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLElementModifiersToReactiveDOMJSLines,
  transpileReactiveHTMLElementModifiersToReactiveDOMJSLines,
} from './modifier/transpile-reactive-html-element-modifiers-to-reactive-dom-js-lines';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericElementToReactiveDOMJSLines =
  | IRequireExternalFunctionCreateElementKey
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLAttributesToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLElementModifiersToReactiveDOMJSLines
  ;

export function transpileReactiveHTMLGenericElementToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLGenericElementToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  const isAttribute: IAttributeValueOrNull = getAttributeValue(node, 'is');

  const elementOptions: ICreateElementOptions | null = (isAttribute === null)
    ? null
    : {
      is: isAttribute,
    };

  const createElementKey: IRequireExternalFunctionCreateElementKey = getCreateElementFunctionNameForElement(node);
  const createElement: string = requireExternalFunction(createElementKey);

  const elementLines: ILines = [
    `// element '${name}'`,
    `const node = ${createElement}(${JSON.stringify(name)}${(elementOptions === null) ? '' : `, ${JSON.stringify(elementOptions)}`});`,
  ];

  const transpiledAttributes: ILinesOrNull = transpileReactiveHTMLAttributesToReactiveDOMJSLines(Array.from(node.attributes), requireExternalFunction);
  const attributesLines: ILines = (transpiledAttributes === null)
    ? []
    : [
      `// attributes`,
      ...transpiledAttributes,
    ];

  const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node), requireExternalFunction);
  const childrenLines: ILines = (transpiledChildren === null)
    ? []
    : scopeLines([
      `// child nodes`,
      `const parentNode = node;`,
      ...transpiledChildren,
    ]);

  const nodeAppendChild: string = requireExternalFunction(REQUIRE_NODE_APPEND_CHILD_CONSTANT);

  const modifiersLines: ILines = transpileReactiveHTMLElementModifiersToReactiveDOMJSLines(
    node,
    [
      ...attributesLines,
      ...childrenLines,
      `${nodeAppendChild}(parentNode, node);`,
    ],
    requireExternalFunction,
  );

  return scopeLines([
    ...elementLines,
    ...modifiersLines,
  ]);
}
