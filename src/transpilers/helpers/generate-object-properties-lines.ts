import { ILines, ILinesOrNull } from '../types/lines.type';
import { indentLines } from './lines-formatting-helpers';

export type IObjectPropertyEntry = [
  propertyName: string,
  propertyValue: string,
];

export type IObjectProperties = IObjectPropertyEntry[];

export function generateObjectPropertyEntry(
  propertyName: string,
  propertyValue: string = propertyName,
): IObjectPropertyEntry {
  return [
    propertyName,
    propertyValue,
  ];
}

export function generateObjectPropertiesLines(
  properties: IObjectProperties,
): ILines {
  return properties
    .map(([propertyName, propertyValue]: IObjectPropertyEntry): string => {
      const value: string = ((propertyName === propertyValue) || (propertyValue === ''))
        ? ''
        : `: ${propertyValue}`;
      return `${propertyName}${value},`;
    });
}

export function generateFullNonEmptyObjectPropertiesLines(
  properties: IObjectProperties,
  trailing: string = '',
): ILines {
  return [
    `{`,
    ...indentLines(generateObjectPropertiesLines(properties)),
    `}${trailing}`,
  ];
}

export function generateFullObjectPropertiesLines(
  properties: IObjectProperties,
  trailing: string = '',
): ILines {
  return (properties.length === 0)
    ? [`{}${trailing}`]
    : generateFullNonEmptyObjectPropertiesLines(properties, trailing);
}

export function generateFullOptionalObjectPropertiesLines(
  properties: IObjectProperties,
  trailing?: string,
): ILinesOrNull {
  return (properties.length === 0)
    ? null
    : generateFullNonEmptyObjectPropertiesLines(properties, trailing);
}
