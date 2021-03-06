import { ILines } from '../../../../../compiler.types';
import { getReferencePropertyJSName, IReferenceProperty } from '../extract-reference-property';


export function compileDefaultReferenceProperty(
  referenceProperty: IReferenceProperty,
): ILines {
  const variableName: string = getReferencePropertyJSName(referenceProperty);

  const lines: ILines = [
    `// reference '${ variableName }'`,
    `var ${ variableName } = node;`,
  ];

  // if (referenceProperty.value !== '') {
  //   lines.push(`setNodeReference(${ JSON.stringify(referenceProperty.value) }, ${ variableName });`);
  // }

  return lines;
}
