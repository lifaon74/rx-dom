import { OnConnect, OnCreate, OnDisconnect, OnInit } from './component-implements';

/** COMPONENT **/

export interface IComponent<GData extends object> extends HTMLElement, Partial<OnCreate<GData>>, Partial<OnInit>, Partial<OnConnect>, Partial<OnDisconnect> {
}

