import { ISubscribeFunction } from '@lifaon/rx-js-light';
import { removeStyleProperty } from '../../../light-dom/style/remove-style-property';
import { setStylePropertyObjectOrNull } from '../../../light-dom/style/set-style-property-object-or-null';
import { IStylePropertyObjectWithOptionalPriorityOrNull } from '../../../light-dom/style/style-property.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { differStyleMap } from './functions/differ-style-map';
import { IStylePropertyAndValueTuple } from './functions/extract-styles';
import { IStylesMap } from './functions/styles-map.type';

export type IDynamicStyleListValue = IStylesMap;

export function setReactiveStyleList(
  subscribe: ISubscribeFunction<IDynamicStyleListValue>,
  element: HTMLElement,
): void {
  let previousStyles: IDynamicStyleListValue = new Map<string, IStylePropertyObjectWithOptionalPriorityOrNull>();

  subscribeOnNodeConnectedTo(element, subscribe, (styles: IDynamicStyleListValue): void => {
    const nextStyles: IStylePropertyAndValueTuple[] = differStyleMap(previousStyles, styles);

    const iterator: IterableIterator<string> = previousStyles.keys();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      removeStyleProperty(element, result.value);
    }

    for (let i = 0, l = nextStyles.length; i < l; i++) {
      const style: [string, IStylePropertyObjectWithOptionalPriorityOrNull] = nextStyles[i];
      setStylePropertyObjectOrNull(element, style[0], style[1]);
    }

    previousStyles = new Map<string, IStylePropertyObjectWithOptionalPriorityOrNull>(styles);
  });
}

