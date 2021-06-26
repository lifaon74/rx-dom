import {
  composeEmitFunction, ISource, mapEmitPipe, mapSubscribePipe, pipeSubscribeFunction
} from '@lifaon/rx-js-light';
import { ISyncAttributeWithSourceOptions, syncAttributeWithSource } from './sync-attribute-with-source';
import { IAttributeValue } from '../../../../light-dom';

export function syncAttributeWithBooleanSource(
  source: ISource<boolean>,
  element: Element,
  name: string,
  defaultSourceValue: boolean,
  options?: ISyncAttributeWithSourceOptions,
): void {
  syncAttributeWithSource(
    {
      subscribe: pipeSubscribeFunction(source.subscribe, [
        mapSubscribePipe<boolean, IAttributeValue>((value: boolean) => {
          return value
            ? ''
            : null;
        }),
      ]),
      emit: composeEmitFunction([
        mapEmitPipe<IAttributeValue, boolean>((value: IAttributeValue): boolean => {
          return (value === null)
            ? defaultSourceValue
            : Boolean(value);
        }),
      ], source.emit),
    },
    element,
    name,
    options,
  );
}
