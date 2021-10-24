import { filterSubscribePipe, ISubscribeFunction, pipeSubscribeFunction } from '@lifaon/rx-js-light';
import { getParentNode } from '../../properties/get-parent-node';
import { INodePositionChangeValue, onNodePositionChangeListener } from './on-node-position-change-listener';

export function onNodeParentChangeListener(target: Node): ISubscribeFunction<INodePositionChangeValue> {
  return pipeSubscribeFunction(onNodePositionChangeListener(target), [
    filterSubscribePipe((previousParentNode: INodePositionChangeValue) => {
      return (getParentNode(target) !== previousParentNode);
    }),
  ]);
}
