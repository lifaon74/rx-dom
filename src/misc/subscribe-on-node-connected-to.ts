import { TOP_PARENT_NODE } from './top-parent-node.constant';
import { onNodeConnectedToWithImmediateCached } from '../light-dom/node/state/on-node-connected-to';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '@lifaon/rx-js-light';

export function subscribeOnNodeConnectedTo<GValue>(
  node: Node,
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
  topParentNode: Node = TOP_PARENT_NODE,
): IUnsubscribeFunction {
  let unsubscribe: IUnsubscribeFunction;
  const unsubscribeOfSubscription: IUnsubscribeFunction = (): void => {
    if (unsubscribe !== void 0) {
      unsubscribe();
    }
  };

  const unsubscribeOfOnNodeConnectedTo: IUnsubscribeFunction = onNodeConnectedToWithImmediateCached(node, topParentNode)((connected: boolean): void => {
    if (connected) {
      unsubscribe = subscribe(emit);
    } else {
      unsubscribeOfSubscription();
    }
  });

  return (): void => {
    unsubscribeOfOnNodeConnectedTo();
    unsubscribeOfSubscription();
  };
}
