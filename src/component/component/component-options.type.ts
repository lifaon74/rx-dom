import { IComponentStyle } from '../component-style/component-style.type';
import { IComponentTemplate } from '../component-template/component-template.type';

export interface IComponentOptions<GData extends object> extends ElementDefinitionOptions {
  name: string; // tag name
  template?: IComponentTemplate<GData>;
  styles?: ArrayLike<IComponentStyle>;
}

