import { getAttributeValue } from '../../../../../../light-dom/attribute/get-attribute-value';
import { hasAttribute } from '../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../light-dom/attribute/remove-attribute';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { hasChildNodes } from '../../../../../../light-dom/node/state/has-child-nodes';
import { generateOptionalTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-reactive-dom-js-lines-for-local-template-from-rx-container-element';
import {
  generateReactiveDOMJSLinesForRXIf,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf,
} from './generate-reactive-dom-js-lines-for-rx-if';

/*
Syntax:

<rx-if
  condition="conditionObservable"
  true="templateReferenceNameTrue"
  false="templateReferenceNameFalse"
></rx-if>

 */

/*
Syntax - alternative:

<element
  *if="conditionObservable"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>

 */

const TAG_NAME: string = 'rx-if';
const COMMAND_NAME: string = '*if';

const CONDITION_ATTRIBUTE_NAME: string = 'condition';
const TEMPLATE_TRUE_ATTRIBUTE_NAME: string = 'true';
const TEMPLATE_FALSE_ATTRIBUTE_NAME: string = 'false';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONDITION_ATTRIBUTE_NAME,
  TEMPLATE_TRUE_ATTRIBUTE_NAME,
  TEMPLATE_FALSE_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement
  ;

export function transpileReactiveHTMLRXIfToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const condition: string | undefined = attributes.get(CONDITION_ATTRIBUTE_NAME);
    const templateTrue: string | undefined = attributes.get(TEMPLATE_TRUE_ATTRIBUTE_NAME);
    const templateFalse: string | undefined = attributes.get(TEMPLATE_FALSE_ATTRIBUTE_NAME);

    if (condition === void 0) {
      throw new Error(`Missing attribute '${CONDITION_ATTRIBUTE_NAME}'`);
    }

    if (
      (templateTrue === void 0)
      && (templateFalse === void 0)
    ) {
      throw new Error(`At least '${TEMPLATE_TRUE_ATTRIBUTE_NAME}' or '${TEMPLATE_FALSE_ATTRIBUTE_NAME}' attribute must be present`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateReactiveDOMJSLinesForRXIf(
      condition,
      generateOptionalTemplateVariableName(templateTrue),
      generateOptionalTemplateVariableName(templateFalse),
      requireExternalFunction,
    );
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const condition: string = getAttributeValue(node, COMMAND_NAME) as string;
    removeAttribute(node, COMMAND_NAME);

    return scopeLines([
      ...generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
        node,
        LOCAL_TEMPLATE_NAME,
        null,
        requireExternalFunction,
      ),
      ...generateReactiveDOMJSLinesForRXIf(
        condition,
        LOCAL_TEMPLATE_NAME,
        'null',
        requireExternalFunction,
      ),
    ]);
  } else {
    return null;
  }
}


