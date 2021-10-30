import { IObjectProperties } from '../../helpers/generate-object-properties-lines';
import { optionalLines } from '../../helpers/lines-formatting-helpers';
import { ILines } from '../../types/lines.type';
import { generateReactiveDOMJSLinesForRXTemplate } from '../dom/rx-component/transpilers/rx-template/generate-reactive-dom-js-lines-for-rx-template';
import { transpileReactiveHTMLToReactiveDOMJSLines } from './transpile-reactive-html-to-reactive-dom-js-lines';

export function transpileReactiveHTMLAsRXTemplateToReactiveDOMJSLines(
  html: string,
  constantsToImport?: IObjectProperties,
): ILines {
  return generateReactiveDOMJSLinesForRXTemplate(
    optionalLines(transpileReactiveHTMLToReactiveDOMJSLines(html)),
    constantsToImport,
  );
}


