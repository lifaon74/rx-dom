import { ICustomElementOptions } from '../custom-element/custom-element-functions';
import { IComponentTemplateAsync } from '../component-template/component-template.type';
import { IComponentStyleAsync } from '../component-style/component-style.type';

export interface IComponentOptions<GData extends object> extends ICustomElementOptions {
  template?: IComponentTemplateAsync<GData>;
  styles?: Iterable<IComponentStyleAsync>;
  useShadowDOM?: boolean;
  // host?: IHostBinding<any>[];
}
