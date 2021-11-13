import { filterObservablePipe, IObservable, pipeObservable } from '@lifaon/rx-js-light';
import { getParentNode } from '../../properties/get-parent-node';
import { INodePositionChangeValue, onNodePositionChangeListener } from './on-node-position-change-listener';

export function onNodeParentChangeListener(target: Node): IObservable<INodePositionChangeValue> {
  return pipeObservable(onNodePositionChangeListener(target), [
    filterObservablePipe((previousParentNode: INodePositionChangeValue) => {
      return (getParentNode(target) !== previousParentNode);
    }),
  ]);
}
