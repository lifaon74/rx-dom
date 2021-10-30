import { ILines } from '../types/lines.type';
import { indentLines } from './lines-formatting-helpers';

export type IObjectPropertyEntry = [propertyName: string, propertyValue: string | ILines];
export type IObjectProperties = IObjectPropertyEntry[];

export function generateObjectPropertiesLines(
  entries: IObjectProperties = [],
  onEmpty: ILines = [`{}`],
): ILines {
  if (entries.length === 0) {
    return onEmpty;
  } else {
    return [
      `{`,
      ...indentLines(
        entries
          .map(([propertyName, propertyValue]: IObjectPropertyEntry): ILines => {

            const propertyValueLines: ILines = (typeof propertyValue === 'string')
              ? (
                (
                  (propertyName === propertyValue)
                  || (propertyValue.trim() === '')
                )
                  ? []
                  : [propertyValue]
              )
              : propertyValue;

            const length: number = propertyValueLines.length;

            return (length === 0)
              ? [`${propertyName},`]
              : (
                (length === 1)
                  ? [`${propertyName}: ${propertyValueLines[0]},`]
                  : [
                    `${propertyName}: ${propertyValueLines[0]}`,
                    ...propertyValueLines.slice(1, -1),
                    `${propertyValueLines[length - 1]},`,
                  ]
              );
          })
          .flat(),
      ),
      `}`,
    ];
  }
}

export function generateObjectPropertyEntry(
  propertyName: string,
  propertyValue: string = propertyName,
): IObjectPropertyEntry {
  return [
    propertyName,
    propertyValue,
  ];
}

export function generateObjectPropertiesFromLinearProperties(
  propertyNames: readonly string[],
): IObjectProperties {
  return propertyNames.map((propertyName: string) => {
    return [propertyName, propertyName];
  });
}



