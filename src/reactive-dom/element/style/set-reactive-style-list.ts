import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IStylePropertyAndValueTuple, IStylesMap } from './functions/extract-styles';
import { differStyleMap } from './functions/differ-style-map';
import { ISubscribeFunction } from '@lifaon/rx-js-light';

export type IDynamicStyleListValue = IStylesMap;

export function setReactiveStyleList(
  subscribe: ISubscribeFunction<IDynamicStyleListValue>,
  element: HTMLElement,
): void {
  let previousStyles: IDynamicStyleListValue = new Map<string, string>();

  subscribeOnNodeConnectedTo(element, subscribe, (styles: IDynamicStyleListValue) => {
    const nextStyles: IStylePropertyAndValueTuple[] = differStyleMap(previousStyles, styles);

    const iterator: IterableIterator<string> = previousStyles.values();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      element.style.removeProperty(result.value);
    }

    for (let i = 0, l = nextStyles.length; i < l; i++) {
      const style: [string, string] = nextStyles[i];
      element.style.setProperty(style[0], style[1]);
    }

    previousStyles = new Map<string, string>(styles);
  });
}

