import { composeObserver, ISource, mapObservablePipe, mapObserverPipe, pipeObservable } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../../../../light-dom/attribute/attribute-value.type';
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
      subscribe: pipeObservable(source.subscribe, [
        mapObservablePipe<number, IAttributeValueOrNull>((value: number) => {
          return (value === defaultSourceValue)
            ? null
            : value.toString(10);
        }),
      ]),
      emit: composeObserver([
        mapObserverPipe<IAttributeValueOrNull, number>((value: IAttributeValueOrNull) => {
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
