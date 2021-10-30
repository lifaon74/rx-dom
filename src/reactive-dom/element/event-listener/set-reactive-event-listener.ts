import { fromEventTarget, IEmitFunction, IKeyValueTuple, ITypedPureEventTarget } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export function setReactiveEventListener<GName extends string, GEvent extends Event>(
  emit: IEmitFunction<GEvent>,
  target: Node & ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
  eventName: GName,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GName, GEvent>(target, eventName), emit);
}


// export function setReactiveEventListener<GName extends string, GEvent extends Event>(
//   emit: IEmitFunction<ISubscribeFunction<GEvent>>,
//   target: Node & ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
//   eventName: GName,
// ): void {
//   emit(fromEventTarget<GName, GEvent>(target, eventName));
// }
