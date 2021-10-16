import { setAttributeValueWithEvent } from '../../light-dom/attribute/with-event/set-attribute-value-with-event';
import { createDocumentFragment } from '../../light-dom/node/create/create-document-fragment';
import { createTextNode } from '../../light-dom/node/create/create-text-node';
import { createElement } from '../../light-dom/node/create/element-node/create-element';
import { nodeAppendChild } from '../../light-dom/node/move/devired/dom-like/node/node-append-child';
import { attachTemplate } from '../../light-dom/template/attach-template';
import { toSubscribeFunctionThrowIfUndefined } from '../../misc/to-subscribe-function';
import { setReactiveAttribute } from '../../reactive-dom/element/attribute/set-reactive-attribute';
import { setReactiveClass } from '../../reactive-dom/element/class/set-reactive-class';
import { setReactiveClassList } from '../../reactive-dom/element/class/set-reactive-class-list';
import { setReactiveEventListener } from '../../reactive-dom/element/event-listener/set-reactive-event-listener';
import { setCaseInsensitiveReactiveProperty } from '../../reactive-dom/element/property/set-reactive-property';
import { setReactiveStyle } from '../../reactive-dom/element/style/set-reactive-style';
import { setReactiveStyleList } from '../../reactive-dom/element/style/set-reactive-style-list';
import { createReactiveContentNode } from '../../reactive-dom/template/reactive-content-node/create-reactive-content-node';
import { createReactiveForLoopNode } from '../../reactive-dom/template/reactive-for-loop-node/create-reactive-for-loop-node';
import { createReactiveIfNode } from '../../reactive-dom/template/reactive-if-node/create-reactive-if-node';
import { createReactiveSwitchNode } from '../../reactive-dom/template/reactive-switch-node/create-reactive-switch-node';
import { createReactiveTextNode } from '../../reactive-dom/text/create-reactive-text-node';

/**
 * Mandatory constants to import for reactiveHTML
 */
export const DEFAULT_CONSTANTS_TO_IMPORT = {
  // misc
  // toSubscribeFunction,
  // toSubscribeFunction: toSubscribeFunctionStrict,
  toSubscribeFunction: toSubscribeFunctionThrowIfUndefined,

  // dom manipulation
  nodeAppendChild,
  attachTemplate,

  // node creation
  createDocumentFragment,
  createTextNode,
  createReactiveTextNode,
  createElement,

  // attribute / property settings
  setAttributeValue: setAttributeValueWithEvent,
  setReactiveProperty: setCaseInsensitiveReactiveProperty,
  setReactiveAttribute,
  setReactiveClass,
  setReactiveClassList,
  setReactiveStyle,
  setReactiveStyleList,
  setReactiveEventListener,

  // reactive nodes
  createReactiveIfNode,
  createReactiveForLoopNode,
  createReactiveSwitchNode,
  createReactiveContentNode,
};



