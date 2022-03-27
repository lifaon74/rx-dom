import { ICreateCustomElementFunction } from '../../../../light-dom/node/create/element-node/derived/types/create-custom-element-function.type';
import { IGetNodeModifierFunction } from '../../../../light-dom/node/modify/node/get-node-modifier-function.type';
import { IHTMLTemplate } from '../../../../light-dom/template/html-template.type';

export type IRawComponentTemplateFunctionArguments<GData extends object> = [
  $: GData,
  $content: DocumentFragment,
  createCustomElement: ICreateCustomElementFunction,
  getNodeModifier: IGetNodeModifierFunction,
];

export type IRawComponentTemplateFunction<GData extends object> = IHTMLTemplate<IRawComponentTemplateFunctionArguments<GData>>;
