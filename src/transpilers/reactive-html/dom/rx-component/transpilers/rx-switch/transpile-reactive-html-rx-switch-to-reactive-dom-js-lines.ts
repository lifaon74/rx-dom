import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { isElementNode } from '../../../../../../light-dom/node/type/is-element-node';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import { generateReactiveDOMJSLinesForRXSwitch } from './generate-reactive-dom-js-lines-for-rx-switch';
import { transpileReactiveHTMLRXSwitchCaseToReactiveDOMJSLines } from './rx-switch-case/transpile-reactive-html-rx-switch-case-to-reactive-dom-js-lines';
import { transpileReactiveHTMLRXSwitchDefaultToReactiveDOMJSLines } from './rx-switch-default/transpile-reactive-html-rx-switch-default-to-reactive-dom-js-lines';
import { SWITCH_DEFAULT_NAME } from './switch-default-name.constant';
import { SWITCH_MAP_NAME } from './switch-map-name.constant';

const TAG_NAME: string = 'rx-switch';

const EXPRESSION_ATTRIBUTE_NAME: string = 'expression';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  EXPRESSION_ATTRIBUTE_NAME,
]);

export function transpileReactiveHTMLRXSwitchToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const expression: string | undefined = attributes.get(EXPRESSION_ATTRIBUTE_NAME);

    if (expression === void 0) {
      throw new Error(`Missing attribute '${EXPRESSION_ATTRIBUTE_NAME}'`);
    }

    const existingSwitchCaseValues: Set<string> = new Set<string>();

    const childNodes: ChildNode[] = getChildNodes(node);
    const childLines: ILines = [];
    let switchDefaultFound: boolean = false;

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXSwitchCaseToReactiveDOMJSLines(childNode, SWITCH_MAP_NAME, existingSwitchCaseValues);
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXSwitchDefaultToReactiveDOMJSLines(childNode, SWITCH_DEFAULT_NAME);
          if (result === null) {
            throw new Error(`Found invalid element '${getTagName(childNode)}'`);
          } else {
            if (switchDefaultFound) {
              throw new Error(`Switch - default already defined`);
            } else {
              switchDefaultFound = true;
              childLines.push(...result);
            }
          }
        } else {
          childLines.push(...result);
        }
      }
    }

    return generateReactiveDOMJSLinesForRXSwitch(expression, childLines, SWITCH_MAP_NAME);
  } else {
    return null;
  }
}


