import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { hasChildNodes } from '../../../../../../light-dom/node/state/has-child-nodes';
import { generateFullOptionalObjectPropertiesLines } from '../../../../../helpers/generate-object-properties-lines';
import { generateTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { convertLetPropertyToObjectPropertyEntry } from '../helpers/convert-let-property-to-object-property-entry';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';

/*
Syntax:

<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>

 */

const TAG_NAME: string = 'rx-inject-template';

const TEMPLATE_ATTRIBUTE_NAME: string = 'template';

export function transpileReactiveHTMLRXInjectTemplateToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    let templateName!: string;
    const letProperties: ILetProperty[] = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        if (attribute.name === TEMPLATE_ATTRIBUTE_NAME) {
          if (templateName === void 0) {
            templateName = attribute.value;
          } else {
            throw new Error(`Found duplicate template name through attribute '${TEMPLATE_ATTRIBUTE_NAME}'`);
          }
        } else {
          throw new Error(`Found invalid attribute '${attribute.name}'`);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    const letPropertiesLines: ILinesOrNull = generateFullOptionalObjectPropertiesLines(
      letProperties.map(convertLetPropertyToObjectPropertyEntry),
      ',',
    );

    return [
      `// inject template`,
      `${generateTemplateVariableName(templateName)}(`,
      ...indentLines([
        `parentNode,`,
        ...optionalLines(letPropertiesLines),
      ]),
      `);`,
    ];
  } else {
    return null;
  }
}

