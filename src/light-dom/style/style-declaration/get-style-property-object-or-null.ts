import { IStylePropertyObject, IStylePropertyObjectOrNull } from '../types/style-property-object.type';
import { getStylePropertyObject } from './get-style-property-object';

export function getStylePropertyObjectOrNull(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
): IStylePropertyObjectOrNull {
  const property: IStylePropertyObject = getStylePropertyObject(styleDeclaration, name);
  return (property.value === '')
    ? null
    : property;
}

