import { ParentNodeConstructor } from '../../types/parent-node-constructor.type';

export const DEFAULT_PARENT_NODE_CONSTRUCTORS: ParentNodeConstructor[] = (typeof Element === 'undefined')
  ? []
  : [Element, Document, DocumentFragment];
