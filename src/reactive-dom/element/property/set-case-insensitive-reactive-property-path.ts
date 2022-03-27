import { IObservable } from '@lifaon/rx-js-light';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { searchCaseInsensitivePropertyOrThrow } from './search-case-insensitive-property';

export function setCaseInsensitiveReactivePropertyPath<GPropertyValue>(
  subscribe: IObservable<GPropertyValue>,
  node: Node,
  path: readonly PropertyKey[],
): void {
  subscribeOnNodeConnectedTo(node, subscribe, (value: GPropertyValue): void => {
    let object: any = node;
    const lengthMinusOne: number = path.length - 1;

    for (let i = 0; i < lengthMinusOne; i++) {
      const propertyKey: PropertyKey = searchCaseInsensitivePropertyOrThrow(
        path[i],
        object,
      );
      object = object[propertyKey];
    }

    const propertyKey: PropertyKey | null = searchCaseInsensitivePropertyOrThrow(
      path[lengthMinusOne],
      object,
    );
    object[propertyKey] = value;
  });
}

// export function setCaseInsensitiveReactivePropertiesPath<GPropertyValue>(
//   subscribe: IObservable<GPropertyValue>,
//   node: Node,
//   path: string,
// ): void {
//   return setCaseInsensitiveReactiveProperties(
//     subscribe,
//     node,
//     path.split('.'),
//   );
// }

