import { IComponent } from './component.type';
import { IComponentOptions } from './component-options.type';
import { IComponentTemplate, IComponentTemplateAsync } from '../component-template/component-template.type';
import {
  onNodeConnectedToCached, onNodeConnectedToWithImmediateCached
} from '../../light-dom/node/state/on-node-connected-to';
import { TOP_PARENT_NODE } from '../../misc/top-parent-node.constant';
import { registerCustomElement } from '../custom-element/custom-element-functions';
import { IComponentStyle, IComponentStyleAsync } from '../component-style/component-style.type';
import {
  decrementStyleElementUsageCount, incrementStyleElementUsageCount
} from '../component-style/style-element-usage-count';
import { activateStyleElement } from '../component-style/helpers/activate-style-element';
import {
  applyGlobalStyleElementForComponent, getGlobalStyleElementForComponent
} from '../component-style/prepare-global-style-element-for-component';
import { freeze } from '@lifaon/rx-js-light';
import { HTMLElementConstructor } from '../../light-dom/types';
import { attachShadow } from '../../light-dom/node/shadow/attach-shadow';
import {
  attachDocumentFragment, detachStandardParentNodeChildrenIntoDocumentFragment, nodeAppendChild
} from '../../light-dom';
import { importNode } from '../../light-dom/others/import-node';

// function loadComponentTemplate<GData extends object>(
//   instance: IComponent<GData>,
//   data: GData,
//   template?: IComponentTemplateAsync<GData>,
// ): Promise<void> {
//   if (template === void 0) {
//     return Promise.resolve();
//   } else {
//     return Promise.resolve(template)
//       .then((template: IComponentTemplate<GData>) => {
//         // attachDocumentFragment(
//         //   template(data, detachStandardParentNodeChildrenIntoDocumentFragment(instance)),
//         // )
//         // const fragment: DocumentFragment = template(data, detachStandardParentNodeChildrenIntoDocumentFragment(instance));
//         // if (useShadowDOM) {
//         //   // const shadowRoot: ShadowRoot = attachShadow(instance);
//         //   attachNode(fragment, attachShadow(instance));
//         // } else {
//         //   attachDocumentFragmentToStandardNode(fragment, instance);
//         // }
//       });
//   }
// }
//
// function loadComponentStyle<GData extends object>(
//   instance: IComponent<GData>,
//   style?: IComponentStyleAsync,
// ): Promise<void> {
//   if (style === void 0) {
//     return Promise.resolve();
//   } else {
//     return Promise.resolve(style)
//       .then((htmlStyleElement: HTMLStyleElement) => {
//         applyStyleElementForComponent(htmlStyleElement, instance);
//         onNodeConnectedToWithImmediateCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
//           if (connected) {
//             if (incrementStyleElementUsageCount(htmlStyleElement) === 1) {
//               activateStyleElement(htmlStyleElement, true);
//             }
//           } else {
//             if (decrementStyleElementUsageCount(htmlStyleElement) === 0) {
//               activateStyleElement(htmlStyleElement, false);
//             }
//           }
//         });
//       });
//   }
// }

type IOptionalComponentTemplateAsync<GData extends object> = IComponentTemplateAsync<GData> | undefined;
type IOptionalComponentStyleAsync = IComponentStyleAsync | undefined;

type IOptionalComponentTemplate<GData extends object> = IComponentTemplate<GData> | undefined;
type IOptionalComponentStyle = IComponentStyle | undefined;

type ILoadedComponentAndStyle<GData extends object> = [IOptionalComponentTemplate<GData>, IOptionalComponentStyle];

function loadComponentTemplateAndStyle<GData extends object>(
  template: IOptionalComponentTemplateAsync<GData>,
  style: IOptionalComponentStyleAsync,
): Promise<ILoadedComponentAndStyle<GData>> {
  return  Promise.all([
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
): void {
  const container: Node = useShadowDOM
    ? attachShadow(instance)
    : instance
  ;

  if (style !== void 0) {
    if (useShadowDOM) {
      nodeAppendChild(container, importNode(style, true));
    } else {
      const globalHTMLStyleElement: HTMLStyleElement = getGlobalStyleElementForComponent(style);
      applyGlobalStyleElementForComponent(globalHTMLStyleElement, instance);
      onNodeConnectedToWithImmediateCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
        if (connected) {
          if (incrementStyleElementUsageCount(globalHTMLStyleElement) === 1) {
            activateStyleElement(globalHTMLStyleElement, true);
          }
        } else {
          if (decrementStyleElementUsageCount(globalHTMLStyleElement) === 0) {
            activateStyleElement(globalHTMLStyleElement, false);
          }
        }
      });
    }
  }

  if (template !== void 0) {
    nodeAppendChild(
      container,
      template(data, detachStandardParentNodeChildrenIntoDocumentFragment(instance)),
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
      : Object.create(null)
  ) as GData;

  loadComponentTemplateAndStyle(
    options.template,
    options.style,
  )
    .then(([template, style]: ILoadedComponentAndStyle<GData>) => {
      injectComponentTemplateAndStyle(
        instance,
        data,
        template,
        style,
        useShadowDOM,
      );
    })
    .then(() => {
      if (typeof instance.onInit === 'function') {
        instance.onInit.call(instance);
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
    constructor(...args: any[]) {
      super(...args);
      initComponent<GData>(this, options);
    }
  };

  registerCustomElement(_class, options);

  return _class;
}

