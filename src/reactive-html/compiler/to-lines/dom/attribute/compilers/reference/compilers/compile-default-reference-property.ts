import { ILines } from '../../../../../compiler.types';
import { getReferencePropertyName, IReferenceProperty } from '../extract-reference-property';


// export function compileDefaultReferenceProperty(
//   referenceProperty: IReferenceProperty,
// ): ILines {
//   const variableName: string = getReferencePropertyJSName(referenceProperty);
//
//   const lines: ILines = [
//     `// reference '${ variableName }'`,
//     `var ${ variableName } = node;`,
//   ];
//
//   // if (referenceProperty.value !== '') {
//   //   lines.push(`setNodeReference(${ JSON.stringify(referenceProperty.value) }, ${ variableName });`);
//   // }
//
//   return lines;
// }


export function compileDefaultReferenceProperty(
  referenceProperty: IReferenceProperty,
): ILines {
  const referenceName: string = getReferencePropertyName(referenceProperty);
  return [
    `// reference ${ JSON.stringify(referenceName) }`,
    `setNodeReference(${ JSON.stringify(referenceName) }, node);`,
  ];
}
