import { IHTMLTemplate } from './html-template.type';

export type IReactiveHTMLTemplate<GTemplateArgument extends object> = IHTMLTemplate<[GTemplateArgument]>;

export type IGenericReactiveHTMLTemplate = IReactiveHTMLTemplate<object>;

export type IGenericReactiveHTMLTemplateOrNull = IGenericReactiveHTMLTemplate | null;
