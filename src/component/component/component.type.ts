import { OnCreate } from './component-implements';

/** COMPONENT **/

export interface IComponent<GData extends object> extends HTMLElement, Partial<OnCreate<GData>> {
}

