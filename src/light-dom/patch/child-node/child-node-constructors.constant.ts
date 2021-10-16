import { ChildNodeConstructor } from '../../types/child-node-constructor.type';

export const DEFAULT_CHILD_NODE_CONSTRUCTORS: ChildNodeConstructor[] = (typeof Element === 'undefined')
  ? []
  : [Element, CharacterData, DocumentType];

