import { ILines } from '../../../../compiler.types';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';
import { stringToLines } from '../../../../helpers';
import { hasAttribute } from '../../../../../../../light-dom';

/*
Syntax:

<rx-script
>
  js code
</rx-script>

 */

const TAG_NAME: string = 'rx-script';
const ATTRIBUTE_NAME: string = 'rx';

export function compileRXScript(
  node: Element,
): ILines | null {
  if (isRXScript(node)) {
    const lines: ILines = (node.textContent === null)
      ? []
      : stringToLines(node.textContent);
    return [
        `// rx-script`,
        ...lines,
      ];
  } else {
    return null;
  }
}

export function isRXScript(
  node: Element,
): boolean {
  return isRXScriptTagName(node)
    || isRXScriptHavingRxAttribute(node);
}

export function isRXScriptTagName(
  node: Element,
): boolean {
  return (getTagName(node) === TAG_NAME);
}

export function isRXScriptHavingRxAttribute(
  node: Element,
): boolean {
  return (getTagName(node) === 'script')
    && hasAttribute(node, ATTRIBUTE_NAME);
}

