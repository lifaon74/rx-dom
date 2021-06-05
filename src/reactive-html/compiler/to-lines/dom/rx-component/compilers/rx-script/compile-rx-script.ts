import { ILines } from '../../../../compiler.types';
import { getTagName } from '../../../../../../../light-dom/node/properties/get-tag-name';
import { indentLines, stringToLines } from '../../../../helpers';

/*
Syntax:

<rx-script
>
  js code
</rx-script>

 */

const TAG_NAME: string = 'rx-script';

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
  return getTagName(node) === TAG_NAME;
}

