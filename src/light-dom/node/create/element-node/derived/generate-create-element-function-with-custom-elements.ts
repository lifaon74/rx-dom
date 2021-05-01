import { HTMLElementConstructor } from '../../../../types';
import { createElement, ICreateElementFunction, ICreateElementOptions } from '../create-element';
import { isCustomElementTagName } from '../../../../tags';
import { createMissingComponentImportRXDOMError } from '../../../../../misc/errors/rx-dom-error-1--missing-component-import';
import { createMissingTagNameForComponentRXDOMError } from '../../../../../misc/errors/rx-dom-error-2--missing-tag-name-for-component';


export function generateCreateElementFunctionWithCustomElements(
  customElements: ArrayLike<HTMLElementConstructor>,
  createElementFunction: ICreateElementFunction = createElement,
): ICreateElementFunction {

  const tags: Set<string> = new Set<string>(Array.from(customElements, (customElement: HTMLElementConstructor, index: number) => {
    if ('TAG_NAME' in customElement) {
      return customElement['TAG_NAME'];
    } else {
      throw createMissingTagNameForComponentRXDOMError(index);
    }
  }));

  return (
    tagName: string,
    options?: ICreateElementOptions,
  ): Element => {
    if (isCustomElementTagName(tagName) && !tags.has(tagName)) {
      throw createMissingComponentImportRXDOMError(tagName);
    } else {
      return createElementFunction(tagName, options);
    }
  };
}

// const FAKE_SET = new WeakSet<any>();
//
// /**
//  * TODO improve:
//  * - ensures that provided tag name is in the list of components
//  */
// export function generateCreateElementFunctionWithCustomElements(
//   customElements: ArrayLike<HTMLElementConstructor>,
//   createElementFunction: ICreateElementFunction = createElement,
// ): ICreateElementFunction {
//   FAKE_SET.add(customElements);
//   return (
//     tagName: string,
//     options?: ICreateElementOptions,
//   ): Element => {
//     return createElementFunction(tagName, options);
//   };
// }
