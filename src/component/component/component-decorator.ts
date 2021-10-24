import { HTMLElementConstructor } from '../../light-dom/types/html-element-constructor.type';
import { componentFactory } from './component-factory';
import { IComponentOptions } from './component-options.type';

/**
 * DECORATOR (CLASS)
 */
export function Component<GData extends object>(
  options: IComponentOptions<GData>,
) {
  return <GClass extends HTMLElementConstructor>(
    target: GClass,
  ): GClass | void => {
    return componentFactory<GClass, GData>(target, options);
  };
}
