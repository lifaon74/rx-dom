import { ICompilerReturn } from '../compiler.types';
import { compileNodes } from '../dom/nodes/compile-nodes';
import { getChildNodes } from '../../../../light-dom/node/properties/get-child-nodes';


export function compileHTML(
  html: string,
): ICompilerReturn {
  const document: Document = new DOMParser()
    .parseFromString(
      // html,
      `
        <!DOCTYPE html>
        <html>
          <head></head>
          <body>${html}</body>
        </html>
        `,
      'text/html',
      // 'application/xhtml+xml'
    );
  return compileNodes(getChildNodes(document.body));
}
