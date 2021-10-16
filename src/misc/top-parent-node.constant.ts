import { getDocumentBody } from '../light-dom';

export const TOP_PARENT_NODE: Node = (typeof Node === 'undefined')
  ? null as unknown as Node
  : getDocumentBody();
