import {
  IStylePropertyObject,
  IStylePropertyObjectWithOptionalPriorityOrNull,
  IStylePropertyPriority,
  IStylePropertyValue,
} from '../../../../../light-dom/style/types/style-property-object.type';

export type  IStylePropertyTupleWithOptionalPriority = [
  value: IStylePropertyValue,
  priority?: IStylePropertyPriority,
];

export type IStylePropertyLike =
  | IStylePropertyObjectWithOptionalPriorityOrNull
  | IStylePropertyTupleWithOptionalPriority
  | IStylePropertyValue
  ;

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

export function stylePropertyLikeToStylePropertyObjectWithOptionalPriorityOrNull(
  input: IStylePropertyLike,
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
