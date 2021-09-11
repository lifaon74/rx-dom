import { getShadowRoot, nodeAppendChild, onNodeConnectedToWithImmediateCached } from '../../../light-dom';
import { importNode } from '../../../light-dom/others/import-node';
import { TOP_PARENT_NODE } from '../../../misc';
import { IComponent } from '../../component';
import { IComponentStyle } from '../component-style.type';
import { activateStyleElement } from '../helpers';
import { applyGlobalStyleElementForComponent, getGlobalStyleElementForComponent } from '../prepare-global-style-element-for-component';
import { linkStyleElementWithComponent, unlinkStyleElementWithComponent } from '../style-element-usage-count';

export function injectComponentStyle(
  style: IComponentStyle,
  instance: IComponent<any>,
): void {
  const globalHTMLStyleElement: HTMLStyleElement = getGlobalStyleElementForComponent(style);
  applyGlobalStyleElementForComponent(globalHTMLStyleElement, instance);
  onNodeConnectedToWithImmediateCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
    if (connected) {
      if (linkStyleElementWithComponent(globalHTMLStyleElement, instance)) {
        activateStyleElement(globalHTMLStyleElement, true);
      }
    } else {
      if (unlinkStyleElementWithComponent(globalHTMLStyleElement, instance)) {
        activateStyleElement(globalHTMLStyleElement, false);
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

