import { getAttributeValue, IAttributeValueOrNull, ICreateElementOptions } from '../../../../../light-dom';
import { getChildNodes } from '../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../light-dom/node/properties/get-tag-name';
import { scopeLines } from '../../../../helpers/lines-formating-helpers';
import { ILines, ILinesOrNull } from '../../../../types/lines.type';
import { transpileReactiveHTMLAttributesToReactiveDOMJSLines } from '../../attributes/transpile-reactive-html-attributes-to-reactive-dom-js-lines';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { transpileReactiveHTMLElementModifiersToReactiveDOMJSLines } from './modifier';

export function transpileReactiveHTMLGenericElementToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  const name: string = getTagName(node);
  const isAttribute: IAttributeValueOrNull = getAttributeValue(node, 'is');

  const elementOptions: ICreateElementOptions | null = (isAttribute === null)
    ? null
    : {
      elementOptions: {
        is: isAttribute,
      },
    };

  const elementLines: ILines = [
    `// element '${name}'`,
    `const node = createElement(${JSON.stringify(name)}${(elementOptions === null) ? '' : `, ${JSON.stringify(elementOptions)}`});`,
  ];

  const transpiledAttributes: ILinesOrNull = transpileReactiveHTMLAttributesToReactiveDOMJSLines(Array.from(node.attributes));
  const attributesLines: ILines = (transpiledAttributes === null)
    ? []
    : [
      `// attributes`,
      ...transpiledAttributes,
    ];

  const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node));
  const childrenLines: ILines = (transpiledChildren === null)
    ? []
    : scopeLines([
      `// child nodes`,
      `const parentNode = node;`,
      ...transpiledChildren,
    ]);

  const modifiersLines: ILines = transpileReactiveHTMLElementModifiersToReactiveDOMJSLines(node, [
    ...attributesLines,
    ...childrenLines,
    `nodeAppendChild(parentNode, node);`,
  ]);

  return scopeLines([
    ...elementLines,
    ...modifiersLines,
  ]);
}