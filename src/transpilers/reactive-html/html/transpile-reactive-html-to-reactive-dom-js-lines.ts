import { getChildNodes } from '../../../light-dom/node/properties/get-child-nodes';
import { ILinesOrNull } from '../../types/lines.type';
import { transpileReactiveHTMLNodesToReactiveDOMJSLines } from '../dom/nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';

export function transpileReactiveHTMLToReactiveDOMJSLines(
  html: string,
): ILinesOrNull {
  const document: Document = new DOMParser()
    .parseFromString(
      `<!DOCTYPE html><html><body>${html}</body></html>`,
      'text/html',
    );
    // .parseFromString(
    //   // html,
    //   `
    //     <!DOCTYPE html>
    //     <html>
    //       <head></head>
    //       <body>${html}</body>
    //     </html>
    //     `,
    //   'text/html',
    //   // 'application/xhtml+xml'
    // );
  return transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(document.body));
}
