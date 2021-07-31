import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { fromEventTarget, IEmitFunction, IKeyValueTuple, ITypedPureEventTarget } from '@lifaon/rx-js-light';

export function setReactiveEventListener<GName extends string, GEvent extends Event>(
  emit: IEmitFunction<any>,
  target: Node & ITypedPureEventTarget<IKeyValueTuple<GName, GEvent>>,
  eventName: GName,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GName, GEvent>(target, eventName), emit);
}


