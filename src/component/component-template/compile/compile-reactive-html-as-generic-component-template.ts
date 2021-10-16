import {
  generateCreateElementFunctionWithCustomElements,
  generateGetNodeModifierFunctionFromArray,
  HTMLElementConstructor,
  IGenericNodeModifier,
} from '../../../light-dom';
import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../../transpilers';
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
