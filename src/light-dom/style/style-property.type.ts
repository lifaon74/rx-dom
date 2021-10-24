export type IStylePropertyValue = string;
export type IStylePropertyPriority = string;

/** GET **/

export interface IStylePropertyObject {
  value: IStylePropertyValue;
  priority: IStylePropertyPriority;
}

export type IStylePropertyObjectOrNull = IStylePropertyObject | null;

/** SET **/

export interface IStylePropertyObjectWithOptionalPriority extends Omit<IStylePropertyObject, 'priority'>, Partial<Pick<IStylePropertyObject, 'priority'>> {
}

export type IStylePropertyObjectWithOptionalPriorityOrNull = IStylePropertyObjectWithOptionalPriority | null;
