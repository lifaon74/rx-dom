import { ILines } from '../../../../compiler.types';
import { indentLines } from '../../../../helpers/lines-formating-helpers';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { extractLetProperty, ILetProperty } from '../helpers/extract-let-property';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';
import { dashCaseToCamelCase } from '../../../../../../../misc/case-converters';
import { generateGetTemplateReferenceCode } from '../../../../helpers/generate-get-template-reference-code';

/*
Syntax:

<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>

 */

const TAG_NAME: string = 'rx-inject-template';

export function compileRXInjectTemplate(
  node: Element,
): ILines | null {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    let referenceName!: string;
    const letProperties: ILetProperty[] = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetProperty(attribute);
      if (letProperty === null) {
        if (attribute.name === 'template') {
          if (referenceName === void 0) {
            referenceName = attribute.value;
          } else {
            throw new Error(`Found duplicate template reference name through attribute 'name'`);
          }
        } else {
          throw new Error(`Found invalid attribute '${ attribute.name }'`);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return [
      `// inject template`,
      `attachTemplate(`,
      ...indentLines([
        `${ generateGetTemplateReferenceCode(referenceName) },`,
        `{`,
        ...indentLines(letProperties.map((letProperty: ILetProperty) => {
          return `${ dashCaseToCamelCase(letProperty.name) }: (${ letProperty.value }),`;
        })),
        `},`,
        `parentNode,`,
      ]),
      `);`,
    ];
  } else {
    return null;
  }
}

