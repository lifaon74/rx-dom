import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines,
  transpileReactiveHTMLNodesToReactiveDOMJSLines,
} from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { generateReactiveDOMJSLinesForRXTemplate } from '../rx-template/generate-reactive-dom-js-lines-for-rx-template';
import { generateReactiveDOMJSLinesForLocalTemplate } from './generate-reactive-dom-js-lines-for-local-template';

export type IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromNodes = IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines;

export function generateReactiveDOMJSLinesForLocalTemplateFromNodes(
  nodes: ArrayLike<Node>,
  templateName: string = 'template',
  argumentsLines: ILinesOrNull,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromNodes>,
): ILines {
  return generateReactiveDOMJSLinesForLocalTemplate(
    generateReactiveDOMJSLinesForRXTemplate(
      argumentsLines,
      transpileReactiveHTMLNodesToReactiveDOMJSLines(nodes, requireExternalFunction),
    ),
    templateName,
  );
}
