import { ISubscription, IUnsubscribeFunction } from '@lifaon/rx-js-light';
import { onNodeConnectedToWithImmediateCached } from '../light-dom';
import { TOP_PARENT_NODE } from './top-parent-node.constant';

export function activateSubscriptionOnNodeConnectedTo(
  node: Node,
  subscription: ISubscription<any>,
  topParentNode: Node = TOP_PARENT_NODE,
): IUnsubscribeFunction {
  return onNodeConnectedToWithImmediateCached(node, topParentNode)((connected: boolean) => {
    if (connected) {
      subscription.activate();
    } else {
      subscription.deactivate();
    }
  });
}
