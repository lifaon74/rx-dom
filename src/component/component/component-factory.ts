import { freeze } from '@lifaon/rx-js-light';
import { defineCustomElement } from '../../light-dom/custom-element/define-custom-element';
import { attachNodeChildrenToNewDocumentFragment } from '../../light-dom/node/move/derived/batch/attach-node-children-to-new-document-fragment';
import { HTMLElementConstructor } from '../../light-dom/types/html-element-constructor.type';
import { isFunction } from '../../misc/is/is-function';
import { injectComponentStyles } from '../component-style/misc/inject-component-style';
import { injectComponentTemplate } from '../component-template/misc/inject-component-template';
import { IComponentOptions } from './component-options.type';
import { IComponent } from './component.type';

/** INIT **/

function initComponent<GData extends object>(
  instance: IComponent<GData>,
  {
    template,
    styles,
  }: IComponentOptions<GData>,
): void {
  const data: GData = freeze(
    isFunction(instance.onCreate)
      ? instance.onCreate()
      : Object.create(null),
  ) as GData;

  if (styles !== void 0) {
    injectComponentStyles(styles, instance);
  }

  if (template !== void 0) {
    injectComponentTemplate(
      template,
      instance,
      data,
      attachNodeChildrenToNewDocumentFragment(instance),
    );
  }
}

/** FACTORY **/

export function componentFactory<GBaseClass extends HTMLElementConstructor, GData extends object>(
  baseClass: GBaseClass,
  options: IComponentOptions<GData>,
) {
  const _class = class extends baseClass {
    static TAG_NAME: string = options.name;

    constructor(...args: any[]) {
      super(...args);
      initComponent<GData>(this, options);
    }
  };

  defineCustomElement(
    options.name,
    _class,
    {
      extends: options.extends,
    },
  );

  return _class;
}

