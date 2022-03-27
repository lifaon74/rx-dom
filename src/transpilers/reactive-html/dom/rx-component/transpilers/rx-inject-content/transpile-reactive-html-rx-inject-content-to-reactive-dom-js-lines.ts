import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { hasChildNodes } from '../../../../../../light-dom/node/state/has-child-nodes';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateReactiveDOMJSLinesForRXInjectContent,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXInjectContent,
} from './generate-reactive-dom-js-lines-for-rx-inject-content';

/*
Syntax:

<rx-inject-content
  content="observable"
></rx-inject-content>

 */

const TAG_NAME: string = 'rx-inject-content';

const CONTENT_ATTRIBUTE_NAME: string = 'content';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONTENT_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToReactiveDOMJSLines = IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXInjectContent;

export function transpileReactiveHTMLRXInjectContentToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXInjectContentToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const template: string | undefined = attributes.get(CONTENT_ATTRIBUTE_NAME);

    if (template === void 0) {
      throw new Error(`Missing attribute '${ATTRIBUTE_NAMES}'`);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateReactiveDOMJSLinesForRXInjectContent(template, requireExternalFunction);
  } else {
    return null;
  }
}


