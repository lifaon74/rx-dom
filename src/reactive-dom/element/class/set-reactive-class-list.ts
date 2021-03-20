import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IClassNamesList } from './functions/extract-class-names';
import { differClassNames } from './functions/differ-class-names';
import { ISubscribeFunction } from '@lifaon/rx-js-light';

export type IReactiveClassListValue = IClassNamesList;

export function setReactiveClassList(
  subscribe: ISubscribeFunction<IReactiveClassListValue>,
  element: Element,
): void {
  let previousClassNames: IClassNamesList = new Set<string>();

  subscribeOnNodeConnectedTo(element, subscribe, (classNames: IReactiveClassListValue) => {
    const nextClassNames: string[] = differClassNames(previousClassNames, classNames);

    const iterator: IterableIterator<string> = previousClassNames.values();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      element.classList.remove(result.value);
    }

    for (let i = 0, l = nextClassNames.length; i < l; i++) {
      element.classList.add(nextClassNames[i]);
    }

    previousClassNames = new Set<string>(classNames);
  });
}

