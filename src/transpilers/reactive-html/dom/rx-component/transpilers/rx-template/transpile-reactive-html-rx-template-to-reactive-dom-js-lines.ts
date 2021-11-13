import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import {
  convertLetPropertyToObjectPropertyEntry,
  extractLetPropertyFromReactiveHTMLAttribute,
  ILetProperty,
} from '../helpers/extract-let-property-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForRXTemplate } from './generate-reactive-dom-js-lines-for-rx-template';
import { generateTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';

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

const TEMPLATE_NAME_ATTRIBUTE_NAME: string = 'name';

export function transpileReactiveHTMLRXTemplateToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === 'rx-template') {
    let templateName!: string;
    const constantsToImports: IObjectProperties = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];

      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        if (attribute.name === TEMPLATE_NAME_ATTRIBUTE_NAME) {
          if (templateName === void 0) {
            templateName = attribute.value;
          } else {
            throw new Error(`Found duplicate template name through attribute '${TEMPLATE_NAME_ATTRIBUTE_NAME}'`);
          }
        } else {
          throw new Error(`Found invalid attribute '${attribute.name}'`);
        }
      } else {
        constantsToImports.push(convertLetPropertyToObjectPropertyEntry(letProperty));
      }
    }

    if (templateName === void 0) {
      throw new Error(`Missing a name for this template`);
    }

    const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node));

    return [
      `// template`,
      `const ${generateTemplateVariableName(templateName)} = (`,
      ...indentLines(
        generateReactiveDOMJSLinesForRXTemplate(optionalLines(transpiledChildren), constantsToImports),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


