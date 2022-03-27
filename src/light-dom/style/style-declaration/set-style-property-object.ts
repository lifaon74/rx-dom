import { IStylePropertyObjectWithOptionalPriority } from '../types/style-property-object.type';
import { setStyleProperty } from './set-style-property';

export function setStylePropertyObject(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
  {
    value,
    priority,
  }: IStylePropertyObjectWithOptionalPriority,
): void {
  setStyleProperty(styleDeclaration, name, value, priority);
}

