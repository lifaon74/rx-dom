import { getChildNodes } from '../../../light-dom/node/properties/get-child-nodes';
import { ILinesOrNull } from '../../types/lines.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines,
  transpileReactiveHTMLNodesToReactiveDOMJSLines,
} from '../dom/nodes/transpile-reactive-html-nodes-to-reactive-dom-js-lines';
import { IRequireExternalFunction } from '../require-external/require-external-function.type';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLNodesToReactiveDOMJSLines
  ;

export function transpileReactiveHTMLToReactiveDOMJSLines(
  html: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLToReactiveDOMJSLines>,
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
  return transpileReactiveHTMLNodesToReactiveDOMJSLines(getChildNodes(document.body), requireExternalFunction);
}
