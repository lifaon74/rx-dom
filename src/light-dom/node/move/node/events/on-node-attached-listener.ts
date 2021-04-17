import { createListenerBuilderFunctions, createListenerMap } from '@lifaon/rx-js-light';
import { attachNode } from '../attach-node';


const ON_NODE_ATTACHED_LISTENERS = createListenerMap<Node, null>();

export const {
  listener: onNodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);
