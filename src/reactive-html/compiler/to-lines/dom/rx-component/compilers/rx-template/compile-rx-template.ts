import { ICompilerReturn, ILines } from '../../../../compiler.types';
import {
  convertLetPropertyToObjectPropertyEntry, extractLetProperty, ILetProperty
} from '../helpers/extract-let-property';
import { indentLines } from '../../../../helpers/lines-formating-helpers';
import {
  extractReferenceProperty, getReferencePropertyName, IReferenceProperty
} from '../../../attribute/compilers/reference/extract-reference-property';
import { compileNodes } from '../../../nodes/compile-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { generateObjectPropertiesLines, IObjectProperties } from '../../../../helpers/generate-object-properties-lines';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';

/*
Syntax:

<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>

 */

export function compileRXTemplate(
  node: Element,
): ILines | null {
  const name: string = getTagName(node);
  if (name === 'rx-template') {
    // let referenceName: string | undefined;
    let referenceProperty!: IReferenceProperty;
    const constantsToImports: IObjectProperties = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetProperty(attribute);
      if (letProperty === null) {
        const _referenceProperty: IReferenceProperty | null = extractReferenceProperty(attribute);
        if (_referenceProperty === null) {
          if (attribute.name === 'name') {
            if ((referenceProperty === void 0)) {
              referenceProperty = {
                value: attribute.value,
                name: '',
                prefixMode: false,
              };
            } else {
              throw new Error(`Found duplicate template's name through attribute 'name'`);
            }
          } else {
            throw new Error(`Found invalid attribute '${ attribute.name }'`);
          }
        } else {
          if (referenceProperty === void 0) {
            referenceProperty = _referenceProperty;
          } else {
            throw new Error(`Found duplicate template's name through reference #${ referenceProperty.name }`);
          }
        }
      } else {
        constantsToImports.push(convertLetPropertyToObjectPropertyEntry(letProperty));
      }
    }

    if (referenceProperty === void 0) {
      throw new Error(`Missing a reference for this template`);
    }

    let compiledChildren: ICompilerReturn = compileNodes(getChildNodes(node));
    if (compiledChildren === null) {
      compiledChildren = [];
    }

    const referenceName: string = getReferencePropertyName(referenceProperty);

    return [
      `// template`,
      `setTemplateReference(${ JSON.stringify(referenceName) }, `,
      ...indentLines(
        generateRXTemplateFunctionLines(compiledChildren, constantsToImports),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


export function generateRXTemplateFunctionLines(
  lines: ILines,
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `(`,
    ...indentLines(generateObjectPropertiesLines(constantsToImport, [])),
    `) => {`,
    ...indentLines([
      `const parentNode = createDocumentFragment();`,
      ...lines,
      `return parentNode;`,
    ]),
    `}`,
  ];
}

