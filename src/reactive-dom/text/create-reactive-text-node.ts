import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>,
): Text {
  const textNode: Text = new Text();

  subscribeOnNodeConnectedTo<string>(textNode, subscribe, (value: string) => {
    textNode.data = value;
  });

  return textNode;
}

