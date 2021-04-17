import { createListenerBuilderFunctions, createListenerMap } from '@lifaon/rx-js-light';
import { IParentNode } from '../../../properties';


const ON_NODE_DETACHED_LISTENERS = createListenerMap<Node, IParentNode>();

export const {
  listener: onNodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);


