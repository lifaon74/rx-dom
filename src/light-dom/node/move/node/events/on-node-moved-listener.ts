import { createListenerBuilderFunctions, createListenerMap } from '@lifaon/rx-js-light';
import { IParentNode } from '../../../properties';


const ON_NODE_MOVED_LISTENERS = createListenerMap<Node, IParentNode>();

export const {
  listener: onNodeMovedListener,
  dispatch: dispatchNodeMoved,
} = createListenerBuilderFunctions(ON_NODE_MOVED_LISTENERS);
