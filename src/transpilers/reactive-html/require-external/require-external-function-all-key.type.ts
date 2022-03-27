import { IRequireCreateCustomElementKey } from './types/require-create-custom-element.type';
import { IRequireCreateElementKey } from './types/require-create-element.type';
import { IRequireCreateMathMLElementKey } from './types/require-create-math-ml-element.type';
import { IRequireCreateReactiveContentNodeKey } from './types/require-create-reactive-content-node.type';
import { IRequireCreateReactiveForLoopNodeKey } from './types/require-create-reactive-for-loop-node.type';
import { IRequireCreateReactiveIfNodeKey } from './types/require-create-reactive-if-node.type';
import { IRequireCreateReactiveSwitchNodeKey } from './types/require-create-reactive-switch-node.type';
import { IRequireCreateReactiveTextNodeKey } from './types/require-create-reactive-text-node.type';
import { IRequireCreateSVGElementKey } from './types/require-create-svg-element.type';
import { IRequireCreateTextNodeKey } from './types/require-create-text-node.type';
import { IRequireGetNodeModifierKey } from './types/require-get-node-modifier.type';
import { IRequireNodeAppendChildKey } from './types/require-node-append-child.type';
import { IRequireSetAttributeValueKey } from './types/require-set-attribute-value.type';
import { IRequireSetReactiveAttributeKey } from './types/require-set-reactive-attribute.type';
import { IRequireSetReactiveClassListKey } from './types/require-set-reactive-class-list.type';
import { IRequireSetReactiveClassKey } from './types/require-set-reactive-class.type';
import { IRequireSetReactiveEventListenerKey } from './types/require-set-reactive-event-listener.type';
import { IRequireSetReactivePropertyPathKey } from './types/require-set-reactive-property-path.type';
import { IRequireSetReactiveStyleListKey } from './types/require-set-reactive-style-list.type';
import { IRequireSetReactiveStyleKey } from './types/require-set-reactive-style.type';
import { IRequireToObservableKey } from './types/require-to-observable.type';

export type IRequireExternalFunctionCreateElementKey =
  | IRequireCreateElementKey
  | IRequireCreateCustomElementKey
  | IRequireCreateSVGElementKey
  | IRequireCreateMathMLElementKey
  ;

export type IRequireExternalFunctionAllKey =
  | IRequireExternalFunctionCreateElementKey
  | IRequireCreateReactiveContentNodeKey
  | IRequireCreateReactiveForLoopNodeKey
  | IRequireCreateReactiveIfNodeKey
  | IRequireCreateReactiveSwitchNodeKey
  | IRequireCreateReactiveTextNodeKey
  | IRequireCreateTextNodeKey
  | IRequireGetNodeModifierKey
  | IRequireNodeAppendChildKey
  | IRequireSetAttributeValueKey
  | IRequireSetReactiveAttributeKey
  | IRequireSetReactiveClassKey
  | IRequireSetReactiveClassListKey
  | IRequireSetReactiveEventListenerKey
  | IRequireSetReactivePropertyPathKey
  | IRequireSetReactiveStyleKey
  | IRequireSetReactiveStyleListKey
  | IRequireToObservableKey
  ;
