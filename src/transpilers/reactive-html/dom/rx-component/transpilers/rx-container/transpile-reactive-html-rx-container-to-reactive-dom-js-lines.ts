import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines,
  transpileReactiveHTMLNodesToReactiveDOMJSLines,
} from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';

/*
Syntax:

<rx-container
>
  ...content
</rx-container>

 */

const TAG_NAME: string = 'rx-container';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXContainerToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines;

export function transpileReactiveHTMLRXContainerToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXContainerToReactiveDOMJSLines>,
): ILinesOrNull {
  if (isRXContainer(node)) {
    return transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node), requireExternalFunction);
  } else {
    return null;
  }
}

export function isRXContainer(
  node: Element,
): boolean {
  return getTagName(node) === TAG_NAME;
}

