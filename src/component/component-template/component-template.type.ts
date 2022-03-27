import { IHTMLTemplate } from '../../light-dom/template/html-template.type';

export type IComponentTemplateArguments<GData extends object> = [
  $: GData,
  $content: DocumentFragment,
];

export type IComponentTemplate<GData extends object> = IHTMLTemplate<IComponentTemplateArguments<GData>>;
