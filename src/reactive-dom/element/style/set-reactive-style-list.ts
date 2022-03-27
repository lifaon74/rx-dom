import { IObservable } from '@lifaon/rx-js-light';
import { removeStylePropertyOfElement } from '../../../light-dom/style/element/remove-style-property-of-element';
import { setStylePropertyObjectOrNullOfElement } from '../../../light-dom/style/element/set-style-property-object-or-null-of-element';
import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../../../light-dom/style/types/style-property-object.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { differStyleMap } from './functions/differ-style-map';
import { IStylePropertyAndValueTuple } from './functions/extract-styles';
import { IStylesMap } from './functions/styles-map.type';

export type IReactiveStyleListValue = IStylesMap;

export function setReactiveStyleList(
  subscribe: IObservable<IReactiveStyleListValue>,
  element: HTMLElement,
): void {
  let previousStyles: IReactiveStyleListValue = new Map<string, IStylePropertyObjectWithOptionalPriorityOrNull>();

  subscribeOnNodeConnectedTo(element, subscribe, (styles: IReactiveStyleListValue): void => {
    const nextStyles: IStylePropertyAndValueTuple[] = differStyleMap(previousStyles, styles);

    const iterator: IterableIterator<string> = previousStyles.keys();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      removeStylePropertyOfElement(element, result.value);
    }

    for (let i = 0, l = nextStyles.length; i < l; i++) {
      const style: [string, IStylePropertyObjectWithOptionalPriorityOrNull] = nextStyles[i];
      setStylePropertyObjectOrNullOfElement(element, style[0], style[1]);
    }

    previousStyles = new Map<string, IStylePropertyObjectWithOptionalPriorityOrNull>(styles);
  });
}

