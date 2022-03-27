import { IStylePropertyObject } from '../types/style-property-object.type';

export function getStylePropertyObject(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
): IStylePropertyObject {
  return {
    value: styleDeclaration.getPropertyValue(name),
    priority: styleDeclaration.getPropertyPriority(name),
  };
}

