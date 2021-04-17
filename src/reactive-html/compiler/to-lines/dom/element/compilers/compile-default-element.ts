import { ICompilerReturn, ILines } from '../../../compiler.types';
import { scopeLines } from '../../../helpers/lines-formating-helpers';
import { compileAttributes } from '../../attributes/compile-attributes';
import { compileNodes } from '../../nodes/compile-nodes';
import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getAttributeValue, IAttributeValue, ICreateElementOptions } from '../../../../../../light-dom';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';


export function compileDefaultElement(
  node: Element,
): ILines | null {
  const name: string = getTagName(node);
  const isAttribute: IAttributeValue = getAttributeValue(node, 'is');

  const elementOptions: ICreateElementOptions | null = (isAttribute === null)
    ? null
    : {
      elementOptions: {
        is: isAttribute,
      }
    };

  const lines: ILines = [
    `// element '${ name }'`,
    `const node = createElement(${ JSON.stringify(name) }${ (elementOptions === null) ? '' : `, ${ JSON.stringify(elementOptions) }` });`,
    `nodeAppendChild(parentNode, node);`,
  ];

  const compiledAttributes: ICompilerReturn = compileAttributes(Array.from(node.attributes));
  if (compiledAttributes !== null) {
    lines.push(...[
      `// attributes`,
      ...compiledAttributes,
    ]);
  }

  const compiledChildren: ICompilerReturn = compileNodes(getChildNodes(node));
  if (compiledChildren !== null) {
    lines.push(...scopeLines([
      `// child nodes`,
      `const parentNode = node;`,
      ...compiledChildren,
    ]));
  }

  return scopeLines(lines);
}


