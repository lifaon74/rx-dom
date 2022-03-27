import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../types/style-property-object.type';
import { removeStyleProperty } from './remove-style-property';
import { setStylePropertyObject } from './set-style-property-object';

export function setStylePropertyObjectOrNull(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
  property: IStylePropertyObjectWithOptionalPriorityOrNull,
): void {
  if (property === null) {
    removeStyleProperty(styleDeclaration, name);
  } else {
    setStylePropertyObject(styleDeclaration, name, property);
  }
}

