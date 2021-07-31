import { freeze } from '@lifaon/rx-js-light';
import { attachNodeChildrenToNewDocumentFragment } from '../../light-dom/node/move/devired/batch/attach-node-children-to-new-document-fragment';
import { attachShadow } from '../../light-dom/node/shadow/attach-shadow';
import { onNodeConnectedToCached } from '../../light-dom/node/state/on-node-connected-to/on-node-connected-to';
import { HTMLElementConstructor } from '../../light-dom/types';
import { TOP_PARENT_NODE } from '../../misc/top-parent-node.constant';
import { IComponentStyle, IComponentStyleAsync } from '../component-style/component-style.type';
import { injectComponentStyle, injectComponentStyleUsingShadowDOM } from '../component-style/misc/inject-component-style';
import { IComponentTemplate, IComponentTemplateAsync } from '../component-template/component-template.type';
import {
  DEFAULT_INJECT_COMPONENT_TEMPLATE_RETURN,
  IInjectComponentTemplateReturn,
  injectComponentTemplate,
} from '../component-template/misc/inject-component-template';
import { registerCustomElement } from '../custom-element/custom-element-functions';
import { IComponentOptions } from './component-options.type';
import { IComponent } from './component.type';

type IOptionalComponentTemplateAsync<GData extends object> = IComponentTemplateAsync<GData> | undefined;
type IOptionalComponentStyleAsync = IComponentStyleAsync | undefined;

type IOptionalComponentTemplate<GData extends object> = IComponentTemplate<GData> | undefined;
type IOptionalComponentStyle = IComponentStyle | undefined;

type ILoadedComponentAndStyle<GData extends object> = [IOptionalComponentTemplate<GData>, IOptionalComponentStyle];

function loadComponentTemplateAndStyle<GData extends object>(
  template: IOptionalComponentTemplateAsync<GData>,
  style: IOptionalComponentStyleAsync,
): Promise<ILoadedComponentAndStyle<GData>> {
  return Promise.all([
    Promise.resolve<IOptionalComponentTemplate<GData>>(template),
    Promise.resolve<IOptionalComponentStyle>(style),
  ]);
}

function injectComponentTemplateAndStyle<GData extends object>(
  instance: IComponent<GData>,
  data: GData,
  template: IOptionalComponentTemplate<GData>,
  style: IOptionalComponentStyle,
  useShadowDOM: boolean,
): IInjectComponentTemplateReturn {
  const container: Node = useShadowDOM
    ? attachShadow(instance)
    : instance
  ;

  if (style !== void 0) {
    if (useShadowDOM) {
      injectComponentStyleUsingShadowDOM(style, instance);
    } else {
      injectComponentStyle(style, instance);
    }
  }

  if (template === void 0) {
    return DEFAULT_INJECT_COMPONENT_TEMPLATE_RETURN;
  } else {
    return injectComponentTemplate(
      template,
      container,
      data,
      attachNodeChildrenToNewDocumentFragment(instance),
    );
  }
}

function initComponent<GData extends object>(
  instance: IComponent<GData>,
  options: IComponentOptions<GData>,
): void {

  const useShadowDOM: boolean = (options.useShadowDOM === void 0)
    ? false
    : options.useShadowDOM;

  const data: GData = freeze(
    (typeof instance.onCreate === 'function')
      ? instance.onCreate()
      : Object.create(null),
  ) as GData;

  loadComponentTemplateAndStyle(
    options.template,
    options.style,
  )
    .then(([template, style]: ILoadedComponentAndStyle<GData>) => {
      return injectComponentTemplateAndStyle(
        instance,
        data,
        template,
        style,
        useShadowDOM,
      );
    })
    .then((options: IInjectComponentTemplateReturn) => {
      if (typeof instance.onInit === 'function') {
        instance.onInit.call(instance, options);
      }
    });

  if (
    (typeof instance.onConnect === 'function')
    || (typeof instance.onDisconnect === 'function')
  ) {
    onNodeConnectedToCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
      if (connected) {
        if (typeof instance.onConnect === 'function') {
          instance.onConnect();
        }
      } else {
        if (typeof instance.onDisconnect === 'function') {
          instance.onDisconnect();
        }
      }
    });
  }
}

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

  registerCustomElement(_class, options);

  return _class;
}

