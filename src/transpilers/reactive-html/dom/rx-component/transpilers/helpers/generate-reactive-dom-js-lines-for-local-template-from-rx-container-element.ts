import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { ILines } from '../../../../../types/lines.type';
import { isRXContainer } from '../rx-container/transpile-reactive-html-rx-container-to-reactive-dom-js-lines';
import { generateReactiveDOMJSLinesForLocalTemplateFromElement } from './generate-reactive-dom-js-lines-for-local-template-from-element';
import { generateReactiveDOMJSLinesForLocalTemplateFromNodes } from './generate-reactive-dom-js-lines-for-local-template-from-nodes';

export function generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
  node: Element,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return isRXContainer(node)
    ? generateReactiveDOMJSLinesForLocalTemplateFromNodes(getChildNodes(node), templateName, constantsToImport)
    : generateReactiveDOMJSLinesForLocalTemplateFromElement(node, templateName, constantsToImport);
}
