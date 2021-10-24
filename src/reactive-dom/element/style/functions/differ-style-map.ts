import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../../../../light-dom/style/style-property.type';
import { IStylePropertyAndValueTuple } from './extract-styles';
import { IStylesMap } from './styles-map.type';

/**
 * Removes from 'previousStyles' values in 'styles' (keep only styles to remove)
 * Appends in 'nextStyles' the list of new styles (styles to add / update)
 * @param previousStyles
 * @param styles - list of styles to set / update
 */
export function differStyleMap(
  previousStyles: IStylesMap,
  styles: IStylesMap,
): IStylePropertyAndValueTuple[] {
  const nextStyles: [string, IStylePropertyObjectWithOptionalPriorityOrNull][] = [];
  const iterator: IterableIterator<[string, IStylePropertyObjectWithOptionalPriorityOrNull]> = styles.entries();
  let result: IteratorResult<[string, IStylePropertyObjectWithOptionalPriorityOrNull]>;
  while (!(result = iterator.next()).done) {
    const [key, styleProperty] = result.value;
    if (previousStyles.has(key)) {
      if (generateStylePropertyKey(previousStyles.get(key) as IStylePropertyObjectWithOptionalPriorityOrNull) !== generateStylePropertyKey(styleProperty)) {
        nextStyles.push([key, styleProperty]);
      }
      previousStyles.delete(key);
    } else {
      nextStyles.push([key, styleProperty]);
    }
  }

  return nextStyles;
}

type IStylePropertyKey = string | null;

function generateStylePropertyKey(
  property: IStylePropertyObjectWithOptionalPriorityOrNull,
): IStylePropertyKey {
  return (property === null)
    ? null
    : `${JSON.stringify(property.value)}-${JSON.stringify(property.priority ?? '')}`;
}
