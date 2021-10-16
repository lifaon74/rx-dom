import { ILines } from '../../../../../../types/lines.type';
import { getReferencePropertyName, IReferenceProperty } from '../extract-reference-property-from-reactive-html-attribute';

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

export function transpileReactiveHTMLDefaultReferencePropertyToReactiveDOMJSLines(
  referenceProperty: IReferenceProperty,
): ILines {
  const referenceName: string = getReferencePropertyName(referenceProperty);
  return [
    `// reference ${JSON.stringify(referenceName)}`,
    `setNodeReference(${JSON.stringify(referenceName)}, node);`,
  ];
}
