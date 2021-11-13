import { composeObserver, ISource, mapObserverPipe, mapObservablePipe, pipeObservable } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../../../../light-dom/attribute/attribute-value.type';
import { ISyncAttributeWithSourceOptions, syncAttributeWithSource } from './sync-attribute-with-source';

export function syncAttributeWithBooleanSource(
  source: ISource<boolean>,
  element: Element,
  name: string,
  defaultSourceValue: boolean,
  options?: ISyncAttributeWithSourceOptions,
): void {
  syncAttributeWithSource(
    {
      subscribe: pipeObservable(source.subscribe, [
        mapObservablePipe<boolean, IAttributeValueOrNull>((value: boolean) => {
          return value
            ? ''
            : null;
        }),
      ]),
      emit: composeObserver([
        mapObserverPipe<IAttributeValueOrNull, boolean>((value: IAttributeValueOrNull): boolean => {
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
