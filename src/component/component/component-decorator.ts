import { IComponentOptions } from './component-options.type';
import { componentFactory } from './component-factory';
import { HTMLElementConstructor } from '../../light-dom/types';


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
