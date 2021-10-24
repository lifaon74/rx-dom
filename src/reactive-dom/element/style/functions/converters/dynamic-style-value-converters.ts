import {
  IStylePropertyObject,
  IStylePropertyObjectWithOptionalPriorityOrNull,
  IStylePropertyPriority,
  IStylePropertyValue,
} from '../../../../../light-dom/style/style-property.type';

export type  IStylePropertyTupleWithOptionalPriority = [value: IStylePropertyValue, priority?: IStylePropertyPriority];

export type IDynamicStyleValueLike =
  IStylePropertyObjectWithOptionalPriorityOrNull
  | IStylePropertyTupleWithOptionalPriority
  | IStylePropertyValue;

export function stylePropertyValueToStylePropertyObject(
  value: IStylePropertyValue,
): IStylePropertyObject {
  return {
    value,
    priority: '',
  };
}

export function stylePropertyTupleWithOptionalPriorityToStylePropertyObject(
  [
    value,
    priority = '',
  ]: IStylePropertyTupleWithOptionalPriority,
): IStylePropertyObject {
  return {
    value,
    priority,
  };
}

export function dynamicStyleValueLikeToDynamicStyleValue(
  input: IDynamicStyleValueLike,
): IStylePropertyObjectWithOptionalPriorityOrNull {
  if (input === null) {
    return null;
  } else if (typeof input === 'string') {
    return stylePropertyValueToStylePropertyObject(input);
  } else if (Array.isArray(input)) {
    return stylePropertyTupleWithOptionalPriorityToStylePropertyObject(input);
  } else {
    return input;
  }
}
