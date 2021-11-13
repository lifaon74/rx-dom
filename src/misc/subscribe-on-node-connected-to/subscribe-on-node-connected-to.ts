import { IObserver, IObservable, IUnsubscribe } from '@lifaon/rx-js-light';
import { onNodeConnectedToWithImmediateCached } from '../../light-dom/node/state/on-node-connected-to/on-node-connected-to';
import { getTopParentNode } from '../get-top-parent-node';

export function subscribeOnNodeConnectedTo<GValue>(
  node: Node,
  subscribe: IObservable<GValue>,
  emit: IObserver<GValue>,
  topParentNode: Node = getTopParentNode(),
): IUnsubscribe {
  let unsubscribe: IUnsubscribe;
  const unsubscribeOfSubscription: IUnsubscribe = (): void => {
    if (unsubscribe !== void 0) {
      unsubscribe();
    }
  };

  const unsubscribeOfOnNodeConnectedTo: IUnsubscribe = onNodeConnectedToWithImmediateCached(node, topParentNode)((connected: boolean): void => {
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
