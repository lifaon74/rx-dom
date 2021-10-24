import { composeEmitFunction, ISource, mapEmitPipe, mapSubscribePipe, pipeSubscribeFunction } from '@lifaon/rx-js-light';
import { IAttributeValueOrNull } from '../../../../light-dom';
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
      subscribe: pipeSubscribeFunction(source.subscribe, [
        mapSubscribePipe<boolean, IAttributeValueOrNull>((value: boolean) => {
          return value
            ? ''
            : null;
        }),
      ]),
      emit: composeEmitFunction([
        mapEmitPipe<IAttributeValueOrNull, boolean>((value: IAttributeValueOrNull): boolean => {
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
