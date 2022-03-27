import { IObservableProxy } from '@lifaon/rx-js-light';
import { createComponentProxy } from './create-component-proxy';

export interface IComponentProxyData<GComponent extends HTMLElement> {
  readonly proxy: IObservableProxy<GComponent>;
  readonly self: GComponent;
}

export function generateComponentProxyData<GComponent extends HTMLElement>(
  instance: GComponent,
): IComponentProxyData<GComponent> {
  return {
    self: instance,
    proxy: createComponentProxy<GComponent>(instance),
  };
}
