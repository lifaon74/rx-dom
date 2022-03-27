import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import { isRXContainer } from '../rx-container/transpile-reactive-html-rx-container-to-reactive-dom-js-lines';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromElement,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromElement,
} from './generate-reactive-dom-js-lines-for-local-template-from-element';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromNodes,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromNodes,
} from './generate-reactive-dom-js-lines-for-local-template-from-nodes';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement =
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromNodes
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromElement
  ;

export function generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
  node: Element,
  templateName: string,
  argumentsLines: ILinesOrNull,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement>,
): ILines {
  return isRXContainer(node)
    ? generateReactiveDOMJSLinesForLocalTemplateFromNodes(getChildNodes(node), templateName, argumentsLines, requireExternalFunction)
    : generateReactiveDOMJSLinesForLocalTemplateFromElement(node, templateName, argumentsLines, requireExternalFunction);
}
