import {
  composeEmitFunction, filterSubscribePipe, ISource, mapEmitPipe, mapSubscribePipe, pipeSubscribeFunction
} from '@lifaon/rx-js-light';
import { ISyncAttributeWithSourceOptions, syncAttributeWithSource } from './sync-attribute-with-source';
import { getAttributeValue, IAttributeValue } from '../../../../light-dom';

export function syncAttributeWithNumberSource(
  source: ISource<number>,
  element: Element,
  name: string,
  defaultSourceValue: number,
  options?: ISyncAttributeWithSourceOptions,
): void {
  syncAttributeWithSource(
    {
      subscribe: pipeSubscribeFunction(source.subscribe, [
        mapSubscribePipe<number, IAttributeValue>((value: number) => {
          return (value === defaultSourceValue)
            ? null
            : value.toString(10);
        }),
      ]),
      emit: composeEmitFunction([
        mapEmitPipe<IAttributeValue, number>((value: IAttributeValue) => {
          return (value === null)
            ? defaultSourceValue
            : Number(value);
        }),
      ], source.emit),
    },
    element,
    name,
    options,
  );
}
