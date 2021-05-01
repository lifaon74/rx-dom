import { createListenerBuilderFunctions, createListenerMap } from '@lifaon/rx-js-light';
import { IParentNode } from '../../properties';

export type INodePositionChangeValue = null | IParentNode;

const ON_NODE_POSITION_CHANGE_LISTENERS = createListenerMap<Node, INodePositionChangeValue>();

export const {
  listener: onNodePositionChangeListener,
  dispatch: dispatchNodePositionChange,
} = createListenerBuilderFunctions(ON_NODE_POSITION_CHANGE_LISTENERS);



