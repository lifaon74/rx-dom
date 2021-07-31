import { subscribeOnNodeConnectedTo } from '../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { ISubscribeFunction } from '@lifaon/rx-js-light';


export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>,
): Text {
  const textNode: Text = new Text();

  subscribeOnNodeConnectedTo<string>(textNode, subscribe, (value: string) => {
    textNode.data = value;
  });

  return textNode;
}

