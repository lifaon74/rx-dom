import { IObjectProperties } from '../../../../../helpers/generate-object-properties-lines';
import { indentLines, optionalLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';
import { transpileReactiveHTMLElementToReactiveDOMJSLines } from '../../../element/transpile-reactive-html-element-to-reactive-dom-js-lines';
import { generateReactiveDOMJSLinesForRXTemplate } from '../rx-template/generate-reactive-dom-js-lines-for-rx-template';

export function generateReactiveDOMJSLinesForLocalTemplateFromElement(
  node: Element,
  templateName: string = 'template',
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `const ${templateName} = (`,
    ...indentLines(
      generateReactiveDOMJSLinesForRXTemplate(optionalLines(transpileReactiveHTMLElementToReactiveDOMJSLines(node)), constantsToImport),
    ),
    `);`,
  ];
}
