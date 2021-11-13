import { IObservable } from '@lifaon/rx-js-light';
import { addCSSClass } from '../../../light-dom/class/add-css-class';
import { removeCSSClass } from '../../../light-dom/class/remove-css-class';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { differClassNames } from './functions/differ-class-names';
import { IClassNamesList } from './functions/extract-class-names';

export type IReactiveClassListValue = IClassNamesList;

export function setReactiveClassList(
  subscribe: IObservable<IReactiveClassListValue>,
  element: Element,
): void {
  let previousClassNames: IClassNamesList = new Set<string>();

  subscribeOnNodeConnectedTo(element, subscribe, (classNames: IReactiveClassListValue) => {
    const nextClassNames: string[] = differClassNames(previousClassNames, classNames);

    const iterator: IterableIterator<string> = previousClassNames.values();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      removeCSSClass(element, result.value);
    }

    for (let i = 0, l = nextClassNames.length; i < l; i++) {
      addCSSClass(element, nextClassNames[i]);
    }

    previousClassNames = new Set<string>(classNames);
  });
}

