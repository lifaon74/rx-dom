import { fromEventTarget, IObserver, IReadonlyEventTarget } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export function setReactiveEventListener<GType extends string, GEvent extends Event>(
  emit: IObserver<GEvent>,
  target: Node & IReadonlyEventTarget<Record<GType, GEvent>>,
  type: GType,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GType, GEvent>(target, type), emit);
}

// export function setReactiveEventListener<GName extends string, GEvent extends Event>(
//   emit: IObserver<IObservable<GEvent>>,
//   target: Node & ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
//   eventName: GName,
// ): void {
//   emit(fromEventTarget<GName, GEvent>(target, eventName));
// }
