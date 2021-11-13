import {
  IObserver,
  IObservable,
  IUnsubscribe,
  noop,
  pipeObservable,
  shareObservablePipe,
} from '@lifaon/rx-js-light';
import { getDocument } from '../../explore/get-document';
import { nodeContains } from '../../explore/node-contains';
import { nodeContainsTraversingShadowDOM } from '../../explore/node-contains-traversing-shadow-dom';
import { onNodeParentChangeListener } from '../../move/node/on-node-parent-change-listener';
import { getParentNode } from '../../properties/get-parent-node';
import { getShadowRootHost } from '../../properties/get-shadow-root-host';
import { documentFragmentIsAShadowRoot } from '../../shadow/document-fragment-is-a-shadow-root';
import { isDocumentFragment } from '../../type/is-document-fragment';

export interface IOnNodeConnectedToOptions {
  traverseShadowDOM?: boolean;
}

export function onNodeConnectedTo(
  node: Node,
  parentNode: Node = getDocument(),
  {
    traverseShadowDOM = true,
  }: IOnNodeConnectedToOptions = {},
): IObservable<boolean> {
  if (node === parentNode) {
    throw new Error(`Invalid parentNode`);
  }

  return (emit: IObserver<boolean>): IUnsubscribe => {
    let running: boolean = true;
    let _unsubscribeFunctions: IUnsubscribe[] = [];
    let _connected: boolean = traverseShadowDOM
      ? nodeContainsTraversingShadowDOM(parentNode, node)
      : nodeContains(parentNode, node);

    const update = (
      referenceNode: Node,
    ): void => {
      let _node: Node = referenceNode;

      while (true) {
        const index: number = _unsubscribeFunctions.length;
        const _isDocumentFragment: boolean = isDocumentFragment(_node);

        _unsubscribeFunctions.push(
          _isDocumentFragment
            ? noop
            // if any of node or its parents have a change in their parent, the node referenceNode change
            : onNodeParentChangeListener(_node)((): void => {
              // removes all unsubscribeFunctions for parents over this node
              while (_unsubscribeFunctions.length > index) {
                (_unsubscribeFunctions.pop() as IUnsubscribe)();
              }
              update(referenceNode);
            }),
        );

        const _parentNode: Node | null = (traverseShadowDOM && _isDocumentFragment && documentFragmentIsAShadowRoot(_node as DocumentFragment))
          ? getShadowRootHost(_node as ShadowRoot)
          : getParentNode(_node);

        if (_parentNode === null) {
          if (_connected) {
            _connected = false;
            emit(false);
          }
          break;
        } else if (_parentNode === parentNode) {
          if (!_connected) {
            _connected = true;
            emit(true);
          }
          break;
        } else {
          _node = _parentNode;
        }
      }
    };

    update(node);

    return (): void => {
      if (running) {
        running = false;
        for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
          _unsubscribeFunctions[i]();
        }
      }
    };
  };
}

export function onNodeConnectedToWithImmediate(
  node: Node,
  parentNode: Node = getDocument(),
  options?: IOnNodeConnectedToOptions,
): IObservable<boolean> {
  const listener: IObservable<boolean> = onNodeConnectedTo(node, parentNode, options);
  return (emit: IObserver<boolean>): IUnsubscribe => {
    emit(parentNode.contains(node));
    return listener(emit);
  };
}

/*---*/

const ON_NODE_CONNECTED_TO_CACHE = new WeakMap<Node, WeakMap<Node, Map<string, IObservable<boolean>>>>();

export function onNodeConnectedToCached(
  node: Node,
  parentNode: Node = getDocument(),
  options: IOnNodeConnectedToOptions = {},
): IObservable<boolean> {
  let map1 = ON_NODE_CONNECTED_TO_CACHE.get(node);
  if (map1 === void 0) {
    map1 = new WeakMap<Node, Map<string, IObservable<boolean>>>();
    ON_NODE_CONNECTED_TO_CACHE.set(node, map1);
  }

  let map2 = map1.get(parentNode);
  if (map2 === void 0) {
    map2 = new Map<string, IObservable<boolean>>();
    map1.set(parentNode, map2);
  }

  const _options: string = JSON.stringify(options);
  let subscribe = map2.get(_options);
  if (subscribe === void 0) {
    subscribe = pipeObservable(onNodeConnectedTo(node, parentNode), [
      shareObservablePipe<boolean>(),
    ]);
    map2.set(_options, subscribe);
  }

  return subscribe;
}

export function onNodeConnectedToWithImmediateCached(
  node: Node,
  parentNode: Node = getDocument(),
  {
    traverseShadowDOM = true,
    ...options
  }: IOnNodeConnectedToOptions = {},
): IObservable<boolean> {
  const listener: IObservable<boolean> = onNodeConnectedToCached(node, parentNode, {
    traverseShadowDOM,
    ...options,
  });
  return (emit: IObserver<boolean>): IUnsubscribe => {
    emit(
      traverseShadowDOM
        ? nodeContainsTraversingShadowDOM(parentNode, node)
        : nodeContains(parentNode, node),
    );
    return listener(emit);
  };
}

// // TODO cache options too
// const ON_NODE_CONNECTED_TO_CACHE = new WeakMap<Node, WeakMap<Node, IObservable<boolean>>>();
//
// export function onNodeConnectedToCached(
//   node: Node,
//   parentNode: Node = getDocument(),
// ): IObservable<boolean> {
//   let map1 = ON_NODE_CONNECTED_TO_CACHE.get(node);
//   if (map1 === void 0) {
//     map1 = new WeakMap<Node, IObservable<boolean>>();
//     ON_NODE_CONNECTED_TO_CACHE.set(node, map1);
//   }
//
//
//   let subscribe = map1.get(parentNode);
//   if (subscribe === void 0) {
//     subscribe = pipeObservable(onNodeConnectedTo(node, parentNode), [
//       shareObservablePipe<boolean>(),
//     ]);
//     map1.set(parentNode, subscribe);
//   }
//
//   return subscribe;
// }
//
//
// export function onNodeConnectedToWithImmediateCached(
//   node: Node,
//   parentNode: Node = getDocument(),
// ): IObservable<boolean> {
//   const listener: IObservable<boolean> = onNodeConnectedToCached(node, parentNode);
//   return (emit: IObserver<boolean>): IUnsubscribe => {
//     emit(parentNode.contains(node));
//     return listener(emit);
//   };
// }
