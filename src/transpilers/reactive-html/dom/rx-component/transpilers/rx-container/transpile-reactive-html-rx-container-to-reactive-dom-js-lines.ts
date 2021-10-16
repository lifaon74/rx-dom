import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';

/*
Syntax:

<rx-container
>
  ...content
</rx-container>

 */

const TAG_NAME: string = 'rx-container';

export function transpileReactiveHTMLRXContainerToReactiveDOMJSLines(
  node: Element,
): ILinesOrNull {
  if (isRXContainer(node)) {
    return transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(node));
  } else {
    return null;
  }
}

export function isRXContainer(
  node: Element,
): boolean {
  return getTagName(node) === TAG_NAME;
}

