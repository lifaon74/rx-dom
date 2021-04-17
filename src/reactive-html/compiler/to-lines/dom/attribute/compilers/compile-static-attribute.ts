import { ILines } from '../../../compiler.types';

export function compileStaticAttribute(
  attribute: Attr,
): ILines | null {

  return (attribute.name === 'is')
    ? null
    : [
      `// static attribute '${ attribute.name }'`,
      `setAttributeValue(node, ${ JSON.stringify(attribute.name) }, ${ JSON.stringify(attribute.value) });`,
    ];
}

