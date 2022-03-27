import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { generateFullOptionalObjectPropertiesLines } from '../../../../../helpers/generate-object-properties-lines';
import { generateTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { indentLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines,
  transpileReactiveHTMLNodesToReactiveDOMJSLines,
} from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { convertLetPropertyToObjectPropertyEntry } from '../helpers/convert-let-property-to-object-property-entry';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';
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

const TEMPLATE_NAME_ATTRIBUTE_NAME: string = 'name';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXTemplateToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines;

export function transpileReactiveHTMLRXTemplateToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXTemplateToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === 'rx-template') {
    let templateName!: string;
    const letProperties: ILetProperty[] = [];

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
        letProperties.push(letProperty);
      }
    }

    if (templateName === void 0) {
      throw new Error(`Missing a name for this template`);
    }

    const letPropertiesLines: ILinesOrNull = generateFullOptionalObjectPropertiesLines(
      letProperties.map(convertLetPropertyToObjectPropertyEntry),
      ',',
    );

    const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToReactiveDOMJSLines(
      getChildNodes(node),
      requireExternalFunction,
    );

    return [
      `// template`,
      `const ${generateTemplateVariableName(templateName)} = (`,
      ...indentLines(
        generateReactiveDOMJSLinesForRXTemplate(letPropertiesLines, transpiledChildren),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


