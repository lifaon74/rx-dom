import { INullish, IObservablePipe, isNullish, mapObservablePipe } from '@lifaon/rx-js-light';
import { isValidCSSIdentifier } from '../../../../misc/tokenizers/css';

/** TYPES **/

export type IClassNamesList = Set<string>; // NORMALIZED

export type IClassNamesAsIterable = Iterable<string>;

export type IClassNamesAsString = string;

export interface IClassNamesAsObject {
  [key: string]: boolean;
}

export type IClassNamesLike =
  INullish
  | IClassNamesAsString
  | IClassNamesAsIterable
  | IClassNamesAsObject;

/** FUNCTIONS **/

/**
 * Expects iterable of well-formed class names, or throws
 */
export function extractClassNamesFromIterator(
  iterator: Iterator<string>,
  classNames: IClassNamesList = new Set<string>(),
): IClassNamesList {
  let i: number = 0;
  let result: IteratorResult<string>;
  while (!(result = iterator.next()).done) {
    const className: string = result.value;
    if (typeof className === 'string') {
      if (isValidCSSIdentifier(className)) {
        classNames.add(className);
        i++;
      } else {
        throw new SyntaxError(`Invalid class name: '${className}'.`);
      }
    } else {
      throw new TypeError(`Expected string in iterator at index ${i}, found: '${className}'.`);
    }
  }
  return classNames;
}

export function extractClassNamesFromIterable(
  iterable: IClassNamesAsIterable,
  classNames?: IClassNamesList,
): IClassNamesList {
  return extractClassNamesFromIterator(iterable[Symbol.iterator](), classNames);
}

/**
 * Expects object having well-formed class names as keys, or throws.
 * Returns only class names where object[key] is true
 */
export function extractClassNamesFromObject(
  object: IClassNamesAsObject,
  classNames: IClassNamesList = new Set<string>(),
): IClassNamesList {
  for (const key in object) {
    if (object[key]) {
      if (typeof key === 'string') {
        extractClassNamesFromString(key, classNames);
      } else {
        throw new TypeError(`Expected string as key, found: '${key}'.`);
      }
    }
  }
  return classNames;
}

/**
 * Extracts a list of class names from a string.
 * Expects string of well-formed class names (separated by spaces), or throws
 */
export function extractClassNamesFromString(
  input: IClassNamesAsString,
  classNames?: IClassNamesList,
): IClassNamesList {
  return extractClassNamesFromIterable(
    input.split(' ')
      .map(_ => _.trim())
      .filter(_ => (_.length > 0)),
    classNames,
  );
}

/**
 * Extracts a list of class names from an input.
 */
export function extractClassNamesFromClassNamesLike(
  input: IClassNamesLike,
  classNames: IClassNamesList = new Set<string>(),
): IClassNamesList {
  if (isNullish(input) || (input === '')) {
    return classNames;
  } else if (typeof input === 'object') {
    if (Symbol.iterator in input) {
      return extractClassNamesFromIterable(input as IClassNamesAsIterable, classNames);
    } else {
      return extractClassNamesFromObject(input as IClassNamesAsObject, classNames);
    }
  } else if (typeof input === 'string') {
    return extractClassNamesFromString(input, classNames);
  } else {
    throw new TypeError(`Invalid input type.`);
  }
}

/**
 * Creates a ObservablePipe which converts IClassNamesLike into IClassNamesList
 */
export function extractClassNamesObservablePipe(): IObservablePipe<IClassNamesLike, IClassNamesList> {
  return mapObservablePipe<IClassNamesLike, IClassNamesList>((input: IClassNamesLike) => extractClassNamesFromClassNamesLike(input));
}

