import { createMissingComponentImportRXDOMError } from '../../../../../misc/errors/rx-dom-error-1--missing-component-import';
import { createMissingTagNameForComponentRXDOMError } from '../../../../../misc/errors/rx-dom-error-2--missing-tag-name-for-component';
import { isCustomElementTagName } from '../../../../tags/is/is-custom-element-tag-name';
import { HTMLElementConstructor } from '../../../../types/html-element-constructor.type';
import { createElement, ICreateElementFunction, ICreateElementOptions } from '../create-element';

export function generateCreateElementFunctionWithCustomElements(
  customElements: ArrayLike<HTMLElementConstructor>,
  createElementFunction: ICreateElementFunction = createElement,
): ICreateElementFunction {
  return (customElements.length === 0)
    ? generateCreateElementFunctionWithNonEmptyCustomElements(customElements, createElementFunction)
    : createElementFunction;
}

export function generateCreateElementFunctionWithNonEmptyCustomElements(
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
