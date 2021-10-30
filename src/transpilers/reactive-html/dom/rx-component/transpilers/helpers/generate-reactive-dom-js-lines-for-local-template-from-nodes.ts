import { IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { generateReactiveDOMJSLinesForRXTemplate } from '../rx-template/generate-reactive-dom-js-lines-for-rx-template';

export function generateReactiveDOMJSLinesForLocalTemplateFromNodes(
  nodes: ArrayLike<Node>,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `const ${templateName} = (`,
    ...indentLines(
      generateReactiveDOMJSLinesForRXTemplate(optionalLines(transpileReactiveHTMLNodesToReactiveDOMJSLines(nodes)), constantsToImport),
    ),
    `);`,
  ];
}
