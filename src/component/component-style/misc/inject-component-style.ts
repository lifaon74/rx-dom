import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { getShadowRoot } from '../../../light-dom/node/properties/get-shadow-root';
import { onNodeConnectedToWithImmediateCached } from '../../../light-dom/node/state/on-node-connected-to/on-node-connected-to';
import { importNode } from '../../../light-dom/others/import-node';
import { getTopParentNode } from '../../../misc/get-top-parent-node';
import { IComponent } from '../../component/component.type';
import { IComponentStyle } from '../component-style.type';
import { activateStyleElement } from '../helpers/activate-style-element';
import { applyGlobalStyleElementForComponent } from '../prepare-global-style-element-for-component';
import { linkStyleElementWithComponent, unlinkStyleElementWithComponent } from '../style-element-usage-count';

export function injectComponentStyle(
  style: IComponentStyle,
  instance: IComponent<any>,
): void {
  applyGlobalStyleElementForComponent(style, instance);
  onNodeConnectedToWithImmediateCached(instance, getTopParentNode())((connected: boolean) => {
    if (connected) {
      if (linkStyleElementWithComponent(style, instance)) {
        activateStyleElement(style, true);
      }
    } else {
      if (unlinkStyleElementWithComponent(style, instance)) {
        activateStyleElement(style, false);
      }
    }
  });
}

export function injectComponentStyles(
  styles: ArrayLike<IComponentStyle>,
  instance: IComponent<any>,
): void {
  for (let i = 0, l = styles.length; i < l; i++) {
    injectComponentStyle(styles[i], instance);
  }
}

/*--------*/

export function injectComponentStyleUsingShadowDOM(
  style: IComponentStyle,
  instance: IComponent<any>,
): void {
  const root: ShadowRoot | null = getShadowRoot(instance);
  if (root === null) {
    throw new Error(`Missing shadow root`);
  } else {
    nodeAppendChild(root, importNode(style, true));
  }
}

export function injectComponentStylesUsingShadowDOM(
  styles: ArrayLike<IComponentStyle>,
  instance: IComponent<any>,
): void {
  for (let i = 0, l = styles.length; i < l; i++) {
    injectComponentStyleUsingShadowDOM(styles[i], instance);
  }
}

