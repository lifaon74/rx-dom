import { IRequireExternalFunction } from './require-external-function.type';
import { REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT } from './types/require-create-custom-element.type';
import { REQUIRE_CREATE_ELEMENT_CONSTANT } from './types/require-create-element.type';
import { REQUIRE_CREATE_MATH_ML_ELEMENT_CONSTANT } from './types/require-create-math-ml-element.type';
import { REQUIRE_CREATE_REACTIVE_CONTENT_NODE_CONSTANT } from './types/require-create-reactive-content-node.type';
import { REQUIRE_CREATE_REACTIVE_FOR_LOOP_NODE_CONSTANT } from './types/require-create-reactive-for-loop-node.type';
import { REQUIRE_CREATE_REACTIVE_IF_NODE_CONSTANT } from './types/require-create-reactive-if-node.type';
import { REQUIRE_CREATE_REACTIVE_SWITCH_NODE_CONSTANT } from './types/require-create-reactive-switch-node.type';
import { REQUIRE_CREATE_REACTIVE_TEXT_NODE_CONSTANT } from './types/require-create-reactive-text-node.type';
import { REQUIRE_CREATE_SVG_ELEMENT_CONSTANT } from './types/require-create-svg-element.type';
import { REQUIRE_CREATE_TEXT_NODE_CONSTANT } from './types/require-create-text-node.type';
import { REQUIRE_GET_NODE_MODIFIER_CONSTANT } from './types/require-get-node-modifier.type';
import { REQUIRE_NODE_APPEND_CHILD_CONSTANT } from './types/require-node-append-child.type';
import { REQUIRE_SET_ATTRIBUTE_VALUE_CONSTANT } from './types/require-set-attribute-value.type';
import { REQUIRE_SET_REACTIVE_ATTRIBUTE_CONSTANT } from './types/require-set-reactive-attribute.type';
import { REQUIRE_SET_REACTIVE_CLASS_LIST_CONSTANT } from './types/require-set-reactive-class-list.type';
import { REQUIRE_SET_REACTIVE_CLASS_CONSTANT } from './types/require-set-reactive-class.type';
import { REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT } from './types/require-set-reactive-event-listener.type';
import { REQUIRE_SET_REACTIVE_PROPERTY_PATH_CONSTANT } from './types/require-set-reactive-property-path.type';
import { REQUIRE_SET_REACTIVE_STYLE_LIST_CONSTANT } from './types/require-set-reactive-style-list.type';
import { REQUIRE_SET_REACTIVE_STYLE_CONSTANT } from './types/require-set-reactive-style.type';
import { REQUIRE_TO_OBSERVABLE_CONSTANT } from './types/require-to-observable.type';

export interface IGenerateDefaultRequireExternalFunctionCallback<GKey extends string, GReturn> {
  (
    requireExternalFunction: IRequireExternalFunction<GKey>,
  ): GReturn;
}

export interface IGenerateDefaultRequireExternalFunctionReturn<GReturn> {
  toImport: Set<string>;
  result: GReturn;
}

export function generateDefaultRequireExternalFunction<GKey extends string, GReturn>(
  callback: IGenerateDefaultRequireExternalFunctionCallback<GKey, GReturn>,
): IGenerateDefaultRequireExternalFunctionReturn<GReturn> {
  const toImport: Set<string> = new Set<string>();

  const add = (name: string): string => {
    toImport.add(name);
    return name;
  };

  const requireExternalFunction: IRequireExternalFunction<GKey> = (name: GKey): string => {
    switch (name) {
      // misc
      case REQUIRE_TO_OBSERVABLE_CONSTANT:
        return add('toObservableThrowIfUndefined');
      case REQUIRE_GET_NODE_MODIFIER_CONSTANT:
        return 'getNodeModifier';
      // dom manipulation
      case REQUIRE_NODE_APPEND_CHILD_CONSTANT:
        return add('nodeAppendChild');
      // node creation
      case REQUIRE_CREATE_TEXT_NODE_CONSTANT:
        return add('createTextNode');
      case REQUIRE_CREATE_REACTIVE_TEXT_NODE_CONSTANT:
        return add('createReactiveTextNode');
      case REQUIRE_CREATE_ELEMENT_CONSTANT:
        return add('createElement');
      case REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT:
        return 'createCustomElement';
      case REQUIRE_CREATE_SVG_ELEMENT_CONSTANT:
        return add('createSVGElement');
      case REQUIRE_CREATE_MATH_ML_ELEMENT_CONSTANT:
        return add('createMathMLElement');
      // attribute / property settings
      case REQUIRE_SET_ATTRIBUTE_VALUE_CONSTANT:
        return add('setAttributeValueWithEvent');
      case REQUIRE_SET_REACTIVE_PROPERTY_PATH_CONSTANT:
        return add('setCaseInsensitiveReactivePropertyPath');
      case REQUIRE_SET_REACTIVE_ATTRIBUTE_CONSTANT:
        return add('setReactiveAttribute');
      case REQUIRE_SET_REACTIVE_CLASS_CONSTANT:
        return add('setReactiveClass');
      case REQUIRE_SET_REACTIVE_CLASS_LIST_CONSTANT:
        return add('setReactiveClassList');
      case REQUIRE_SET_REACTIVE_STYLE_CONSTANT:
        return add('setReactiveStyle');
      case REQUIRE_SET_REACTIVE_STYLE_LIST_CONSTANT:
        return add('setReactiveStyleList');
      case REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT:
        return add('setReactiveEventListener');
      // reactive nodes
      case REQUIRE_CREATE_REACTIVE_IF_NODE_CONSTANT:
        return add('createReactiveIfNode');
      case REQUIRE_CREATE_REACTIVE_FOR_LOOP_NODE_CONSTANT:
        return add('createReactiveForLoopNode');
      case REQUIRE_CREATE_REACTIVE_SWITCH_NODE_CONSTANT:
        return add('createReactiveSwitchNode');
      case REQUIRE_CREATE_REACTIVE_CONTENT_NODE_CONSTANT:
        return add('createReactiveContentNode');
      default:
        throw new TypeError(`Unknown require name: '${name}'`);
    }
  };

  const result: GReturn = callback(requireExternalFunction);

  return {
    toImport,
    result,
  };
}
