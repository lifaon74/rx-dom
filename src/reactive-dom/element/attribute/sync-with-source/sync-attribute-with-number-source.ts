import { composeEmitFunction, ISource, mapEmitPipe, mapSubscribePipe, pipeSubscribeFunction } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../../../../light-dom';
import { ISyncAttributeWithSourceOptions, syncAttributeWithSource } from './sync-attribute-with-source';

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
        mapSubscribePipe<number, IAttributeValueOrNull>((value: number) => {
          return (value === defaultSourceValue)
            ? null
            : value.toString(10);
        }),
      ]),
      emit: composeEmitFunction([
        mapEmitPipe<IAttributeValueOrNull, number>((value: IAttributeValueOrNull) => {
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
