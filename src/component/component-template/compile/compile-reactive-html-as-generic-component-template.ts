import { generateCreateElementFunctionWithCustomElements } from '../../../light-dom/node/create/element-node/derived/generate-create-element-function-with-custom-elements';
import { generateGetNodeModifierFunctionFromArray } from '../../../light-dom/node/modify/node/generate-get-node-modifier-function';
import { IGenericNodeModifier } from '../../../light-dom/node/modify/node/node-modifier.type';
import { HTMLElementConstructor } from '../../../light-dom/types/html-element-constructor.type';
import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../../transpilers/constants/default-constants-to-import.constant';
import { IComponentTemplate, IComponentTemplateCompileOptions } from '../component-template.type';
import { compileReactiveHTMLAsComponentTemplate } from './compile-reactive-html-as-component-template';

export interface ICompileReactiveHTMLAsGenericComponentTemplateOptions extends IComponentTemplateCompileOptions {
  html: string;
  customElements?: ArrayLike<HTMLElementConstructor>;
  modifiers?: ArrayLike<IGenericNodeModifier>;
}

export function compileReactiveHTMLAsGenericComponentTemplate<GData extends object>(
  {
    html,
    customElements = [],
    modifiers = [],
    ...options
  }: ICompileReactiveHTMLAsGenericComponentTemplateOptions,
): IComponentTemplate<GData> {
  return compileReactiveHTMLAsComponentTemplate(
    html,
    {
      ...DEFAULT_CONSTANTS_TO_IMPORT,
      createElement: generateCreateElementFunctionWithCustomElements(customElements),
      getNodeModifier: generateGetNodeModifierFunctionFromArray(modifiers),
    },
    options,
  );
}
