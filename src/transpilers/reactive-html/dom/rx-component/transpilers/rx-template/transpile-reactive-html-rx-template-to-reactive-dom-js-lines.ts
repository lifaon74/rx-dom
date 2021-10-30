import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { indentLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import {
  extractReferencePropertyFromReactiveHTMLAttribute,
  getReferencePropertyName,
  IReferenceProperty,
} from '../../../attribute/transpilers/reference/extract-reference-property-from-reactive-html-attribute';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import {
  convertLetPropertyToObjectPropertyEntry,
  extractLetPropertyFromReactiveHTMLAttribute,
  ILetProperty,
} from '../helpers/extract-let-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForRXTemplate } from './generate-reactive-dom-js-lines-for-rx-template';

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

export function transpileReactiveHTMLRXTemplateToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === 'rx-template') {
    // let referenceName: string | undefined;
    let referenceProperty!: IReferenceProperty;
    const constantsToImports: IObjectProperties = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        const _referenceProperty: IReferenceProperty | null = extractReferencePropertyFromReactiveHTMLAttribute(attribute);
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
            throw new Error(`Found invalid attribute '${attribute.name}'`);
          }
        } else {
          if (referenceProperty === void 0) {
            referenceProperty = _referenceProperty;
          } else {
            throw new Error(`Found duplicate template's name through reference #${referenceProperty.name}`);
          }
        }
      } else {
        constantsToImports.push(convertLetPropertyToObjectPropertyEntry(letProperty));
      }
    }

    if (referenceProperty === void 0) {
      throw new Error(`Missing a reference for this template`);
    }

    let transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node));
    if (transpiledChildren === null) {
      transpiledChildren = [];
    }

    const referenceName: string = getReferencePropertyName(referenceProperty);

    return [
      `// template`,
      `setTemplateReference(${JSON.stringify(referenceName)}, `,
      ...indentLines(
        generateReactiveDOMJSLinesForRXTemplate(transpiledChildren, constantsToImports),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


