import { TOP_PARENT_NODE } from './top-parent-node-constant';
import { onNodeConnectedToWithImmediateCached } from '../light-dom/node/state/on-node-connected-to';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '@lifaon/rx-js-light';

export function subscribeOnNodeConnectedTo<GValue>(
  node: Node,
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
  topParentNode: Node = TOP_PARENT_NODE,
): void {
  let unsubscribe: IUnsubscribeFunction;
  onNodeConnectedToWithImmediateCached(node, topParentNode)((connected: boolean) => {
    if (connected) {
      unsubscribe = subscribe(emit);
    } else if (unsubscribe !== void 0) {
      unsubscribe();
    }
  });
}
