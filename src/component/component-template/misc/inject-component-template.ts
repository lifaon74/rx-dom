import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { IComponentTemplate } from '../component-template.type';

export function injectComponentTemplate<GData extends object>(
  template: IComponentTemplate<GData>,
  container: Node,
  data: GData,
  content: DocumentFragment,
): void {
  nodeAppendChild(
    container,
    template({
      data,
      content,
    }),
  );
}

