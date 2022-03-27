import { IStylePropertyPriority, IStylePropertyValue } from '../types/style-property-object.type';

export function setStyleProperty(
  styleDeclaration: CSSStyleDeclaration,
  name: string,
  value: IStylePropertyValue,
  priority?: IStylePropertyPriority,
): void {
  styleDeclaration.setProperty(name, value, priority);
}


