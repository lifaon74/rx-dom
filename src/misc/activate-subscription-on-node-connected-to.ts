import { ISubscription, IUnsubscribe } from '@lifaon/rx-js-light';
import { onNodeConnectedToWithImmediateCached } from '../light-dom/node/state/on-node-connected-to/on-node-connected-to';
import { getTopParentNode } from './get-top-parent-node';

export function activateSubscriptionOnNodeConnectedTo(
  node: Node,
  subscription: ISubscription<any>,
  topParentNode: Node = getTopParentNode(),
): IUnsubscribe {
  return onNodeConnectedToWithImmediateCached(node, topParentNode)((connected: boolean) => {
    if (connected) {
      subscription.activate();
    } else {
      subscription.deactivate();
    }
  });
}
