import { createMissingComponentImportRXDOMError } from '../../../../../misc/errors/rx-dom-error-1--missing-component-import';
import { createMissingTagNameForComponentRXDOMError } from '../../../../../misc/errors/rx-dom-error-2--missing-tag-name-for-component';
import { createCustomElement } from '../create-custom-element';
import { ICreateCustomElementFunction } from './types/create-custom-element-function.type';
import { ICustomElementConstructorOrReference } from './types/custom-element-constructor-or-reference.type';
import { isCustomElementConstructorReference } from './types/custom-element-constructor-reference.type';
import { ICustomElementConstructor } from './types/custom-element-constructor.type';

export function generateCreateCustomElementFunctionFromCustomElementsList(
  customElements: ArrayLike<ICustomElementConstructorOrReference>,
): ICreateCustomElementFunction {
  const tags: Set<string> = new Set<string>();
  let resolved: boolean = false;

  const resolveTags = (): Set<string> => {
    if (!resolved) {
      for (let i = 0, l = customElements.length; i < l; i++) {
        const customElementOrReference: ICustomElementConstructorOrReference = customElements[i];

        const customElement: ICustomElementConstructor = isCustomElementConstructorReference(customElementOrReference)
          ? customElementOrReference()
          : customElementOrReference;

        if ('TAG_NAME' in customElement) {
          tags.add(customElement['TAG_NAME']);
        } else {
          throw createMissingTagNameForComponentRXDOMError(i);
        }
      }
      resolved = true;
    }

    return tags;
  };

  return <GElement extends Element>(
    tagName: string,
  ): GElement => {
    const tags: Set<string> = resolveTags();
    if (!tags.has(tagName)) {
      throw createMissingComponentImportRXDOMError(tagName);
    } else {
      return createCustomElement<GElement>(tagName);
    }
  };
}
