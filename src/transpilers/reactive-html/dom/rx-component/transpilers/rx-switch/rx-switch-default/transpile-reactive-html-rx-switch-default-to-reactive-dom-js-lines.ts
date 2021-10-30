import { hasAttribute } from '../../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../../light-dom/attribute/remove-attribute';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { generateGetTemplateReferenceCode } from '../../../../../../helpers/generate-get-template-reference-code';
import { scopeLines } from '../../../../../../helpers/lines-formatting-helpers';
import { ILinesOrNull } from '../../../../../../types/lines.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../../helpers/extract-rx-attributes-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement } from '../../helpers/generate-reactive-dom-js-lines-for-local-template-from-rx-container-element';
import { generateReactiveDOMJSLinesForRXSwitchDefault } from './generate-reactive-dom-js-lines-for-rx-switch-default';

const TAG_NAME: string = 'rx-switch-default';
const COMMAND_NAME: string = '*switch-default';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  LOCAL_TEMPLATE_NAME,
]);

export function transpileReactiveHTMLRXSwitchDefaultToReactiveDOMJSLines(
  node: Element,
  switchDefaultName: string,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(LOCAL_TEMPLATE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${LOCAL_TEMPLATE_NAME}'`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateReactiveDOMJSLinesForRXSwitchDefault(switchDefaultName, generateGetTemplateReferenceCode(template));
  } else if (hasAttribute(node, COMMAND_NAME)) {
    removeAttribute(node, COMMAND_NAME);

    return scopeLines([
      ...generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(node, LOCAL_TEMPLATE_NAME),
      ...generateReactiveDOMJSLinesForRXSwitchDefault(switchDefaultName, LOCAL_TEMPLATE_NAME),
    ]);
  } else {
    return null;
  }
}


