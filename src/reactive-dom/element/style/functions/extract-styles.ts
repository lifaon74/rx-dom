// import { INullish, IObservablePipe, mapObservablePipe } from '@lifaon/rx-js-light';
// import { createStyleElement, getCSSStyleSheetOfStyleElement } from '../../../../component';
// import { IStylesMap } from './styles-map.type';
import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../../../../light-dom/style/types/style-property-object.type';

// /** TYPES **/
//
// export type IStylePropertyWithOptionalUnit = string;
//
// export type IStylePropertyAndUnitTuple = [propertyName: string, unit: string | null];
//
// export type IStyleGenericValue = string | number;
// export type IStylePropertyAndGenericValueTuple = [propertyName: IStylePropertyWithOptionalUnit, value: IStyleGenericValue];

export type IStylePropertyAndValueTuple = [propertyName: string, value: IStylePropertyObjectWithOptionalPriorityOrNull];
//
// export type IStylesAsString = string;
//
// export interface IStylesAsObject {
//   [key: string /* IStylePropertyWithOptionalUnit */]: IStyleGenericValue;
// }
//
// export type IStylesLike =
//   INullish
//   | IStylesAsString
//   | Iterable<IStylePropertyAndGenericValueTuple>
//   | IStylesAsObject;
//
// /** FUNCTIONS **/
//
// const STYLE_KEY_EXTRACTOR_REG_EXP: RegExp = new RegExp('\\.([a-zA-Z%]+)$');
//
// /**
//  * Extracts units from key if present, and returns tuple [propertyName, unit].
//  * @example: 'font-size.px' => ['font-size', 'px']
//  * @example: 'color' => ['color', null]
//  */
// export function extractUnit(
//   propertyName: IStylePropertyWithOptionalUnit,
// ): IStylePropertyAndUnitTuple {
//   STYLE_KEY_EXTRACTOR_REG_EXP.lastIndex = 0;
//   const match: RegExpExecArray | null = STYLE_KEY_EXTRACTOR_REG_EXP.exec(propertyName);
//   if (match === null) {
//     return [propertyName.trim(), null];
//   } else {
//     return [propertyName.slice(0, -match[0].length).trim(), match[1]];
//   }
// }
//
//
// /**
//  * Extracts units from key if present, and returns proper style tuple.
//  * @example: ['font-size.px', 12] => ['font-size', '12px']
//  */
// export function normalizeStylePropertyAndGenericValue(
//   stylePropertyAndGenericValue: IStylePropertyAndGenericValueTuple,
// ): IStylePropertyAndValueTuple {
//   const value: string = String(stylePropertyAndGenericValue[1]);
//   const [propertyName, unit]: IStylePropertyAndUnitTuple = extractUnit(stylePropertyAndGenericValue[0]);
//   return [
//     propertyName,
//     (unit === null)
//       ? value
//       : (value + unit)
//   ];
// }
//
// /**
//  * Inserts propertyName / value in map. Extracts units if necessary.
//  */
// export function stylePropertyAndGenericValueToMap(
//   stylePropertyAndGenericValue: IStylePropertyAndGenericValueTuple,
//   map: IStylesMap,
// ): void {
//   const [propertyName, value]: IStylePropertyAndValueTuple = normalizeStylePropertyAndGenericValue(stylePropertyAndGenericValue);
//   map.set(propertyName, value);
// }
//
// /*--*/
//
// export function extractStylesFromIterator(
//   iterator: Iterator<IStylePropertyAndGenericValueTuple>,
//   map: IStylesMap = new Map<string, string>(),
// ): IStylesMap {
//   let i: number = 0;
//   let result: IteratorResult<IStylePropertyAndGenericValueTuple>;
//   while (!(result = iterator.next()).done) {
//     const stylePropertyAndGenericValue: IStylePropertyAndGenericValueTuple = result.value;
//     if (
//       Array.isArray(stylePropertyAndGenericValue)
//       && (stylePropertyAndGenericValue.length === 2)
//       && (typeof stylePropertyAndGenericValue[0] === 'string')
//       && (
//         (typeof stylePropertyAndGenericValue[1] === 'string')
//         || (typeof stylePropertyAndGenericValue[1] === 'number')
//       )
//     ) {
//       stylePropertyAndGenericValueToMap(stylePropertyAndGenericValue, map);
//       i++;
//     } else {
//       throw new TypeError(`Expected [string, string | number] in iterator at index ${ i }, found: '${ stylePropertyAndGenericValue }'.`);
//     }
//   }
//   return map;
// }
//
// export function extractStylesFromIterable(
//   iterable: Iterable<IStylePropertyAndGenericValueTuple>,
//   map?: IStylesMap,
// ): IStylesMap {
//   return extractStylesFromIterator(iterable[Symbol.iterator](), map);
// }
//
//
// export function extractStylesFromObject(
//   object: IStylesAsObject,
//   styles: IStylesMap = new Map<string, string>(),
// ): IStylesMap {
//   for (const key in object) {
//     if (typeof key === 'string') {
//       const value: IStyleGenericValue = object[key];
//       const typeofValue: string = typeof value;
//       if (
//         (typeofValue === 'string')
//         || (typeofValue === 'number')
//       ) {
//         stylePropertyAndGenericValueToMap([key, object[key]], styles);
//       } else {
//         throw new TypeError(`Expected string or number as object['${ key }'], found: '${ value }'.`);
//       }
//     } else {
//       throw new TypeError(`Expected string as key, found: '${ key }'.`);
//     }
//   }
//   return styles;
// }
//
// export function extractStylesFromString(
//   input: IStylesAsString,
//   styles: IStylesMap = new Map<string, string>(),
// ): IStylesMap {
//   if (!input.endsWith(';')) {
//     input += ';';
//   }
//
//   const styleElement: HTMLStyleElement = createStyleElement(`[elt] { ${ input } }`);
//
//   const sheet: CSSStyleSheet = getCSSStyleSheetOfStyleElement(styleElement);
//   sheet.disabled = true;
//
//   for (let i = 0, rulesLength = sheet.cssRules.length; i < rulesLength; i++) {
//     const rule: CSSRule = sheet.cssRules[i];
//     if (rule.type === CSSRule.STYLE_RULE) {
//       const style: CSSStyleDeclaration = (rule as CSSStyleRule).style;
//       for (let j = 0, stylesLength = style.length; j < stylesLength; j++) {
//         const property: string = style.item(j);
//         styles.set(property, style.getPropertyValue(property));
//       }
//     }
//   }
//
//   return styles;
// }
//
//
// export function extractStylesFromStylesLike(
//   input: IStylesLike,
//   styles: IStylesMap = new Map<string, string>(),
// ): IStylesMap {
//   if ((input === null) || (input === void 0) || (input as any === '')) {
//     return styles;
//   } else if (typeof input === 'object') {
//     if (Symbol.iterator in input) {
//       return extractStylesFromIterable(input as Iterable<IStylePropertyAndGenericValueTuple>, styles);
//     } else {
//       return extractStylesFromObject(input as IStylesAsObject, styles);
//     }
//   } else if (typeof input === 'string') {
//     return extractStylesFromString(input, styles);
//   } else {
//     throw new TypeError(`Invalid input type.`);
//   }
// }
//
//
// export function extractStylesObservablePipe(): IObservablePipe<IStylesLike, IStylesMap> {
//   return mapObservablePipe<IStylesLike, IStylesMap>((input: IStylesLike) => extractStylesFromStylesLike(input));
// }
