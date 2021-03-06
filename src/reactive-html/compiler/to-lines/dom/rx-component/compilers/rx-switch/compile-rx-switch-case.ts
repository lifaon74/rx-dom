import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';
import { hasAttribute } from '../../../../../../../light-dom/attribute/has-attribute';
import { getAttributeValue } from '../../../../../../../light-dom/attribute/get-attribute-value';
import { setAttributeValue } from '../../../../../../../light-dom/attribute/set-attribute-value';
import { scopeLines } from '../../../../helpers/lines-formating-helpers';
import { generateLocalTemplateLinesFromRXContainerOrElement } from '../helpers/generate-local-template-lines-from-node';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';
import { generateGetOptionalTemplateReferenceCode } from '../../../../helpers/generate-get-template-reference-code';


const TAG_NAME: string = 'rx-switch-case';
const COMMAND_NAME: string = '*switch-case';

const SWITCH_CASE_ATTRIBUTE_NAME: string = 'case';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  SWITCH_CASE_ATTRIBUTE_NAME,
  LOCAL_TEMPLATE_NAME,
]);


export function compileRXSwitchCase(
  node: Element,
  switchMapName: string,
  existingSwitchCaseValues: Set<string>,
): ILines | null {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const caseValue: string | undefined = attributes.get(SWITCH_CASE_ATTRIBUTE_NAME);
    const template: string | undefined = attributes.get(LOCAL_TEMPLATE_NAME);

    if (caseValue === void 0) {
      throw new Error(`Missing attribute '${ SWITCH_CASE_ATTRIBUTE_NAME }'`);
    }

    if (existingSwitchCaseValues.has(caseValue)) {
      throw new Error(`case '${ caseValue }' already exists`);
    } else {
      existingSwitchCaseValues.add(caseValue);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXSwitchCaseLines(switchMapName, caseValue, generateGetOptionalTemplateReferenceCode(template));
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const caseValue: string = getAttributeValue(node, COMMAND_NAME) as string;
    setAttributeValue(node, COMMAND_NAME, null);

    return scopeLines([
      ...generateLocalTemplateLinesFromRXContainerOrElement(node, LOCAL_TEMPLATE_NAME),
      ...generateRXSwitchCaseLines(switchMapName, caseValue, LOCAL_TEMPLATE_NAME),
    ]);
  } else {
    return null;
  }
}


export function generateRXSwitchCaseLines(
  switchMapName: string,
  caseValue: string,
  template: string,
): ILines {
  return [
    `// switch case`,
    `${ switchMapName }.set(${ caseValue }, ${ template });`,
  ];
}
