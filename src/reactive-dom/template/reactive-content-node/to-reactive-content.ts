import { IObservable, mapObservable } from '@lifaon/rx-js-light';
import { createDocumentFragment } from '../../../light-dom/node/create/create-document-fragment';
import { createTextNode } from '../../../light-dom/node/create/create-text-node';
import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { IDocumentFragmentOrNull } from '../../../light-dom/node/type/document-fragment-or-null.type';
import { isDocumentFragment } from '../../../light-dom/node/type/is-document-fragment';
import { isDOMNode } from '../../../light-dom/node/type/is-dom-node';
import { toObservableThrowIfUndefined } from '../../../misc/to-observable';
import { IReactiveContent } from './create-reactive-content-node';

export type IToReactiveContentValue =
  string
  | DocumentFragment
  | null
  ;

export function toReactiveContent(
  value: IToReactiveContentValue,
): IDocumentFragmentOrNull {
  if (value === null) {
    return null;
  } else if (typeof value === 'string') {
    const fragment: DocumentFragment = createDocumentFragment();
    nodeAppendChild(fragment, createTextNode(value));
    return fragment;
  } else if (isDOMNode(value) && isDocumentFragment(value)) {
    return value;
  } else {
    throw new Error(`Invalid toReactiveContent value`);
  }
}

/* ---- */

export type IToReactiveContentInput =
  IToReactiveContentValue
  | IObservable<IToReactiveContentValue>
  ;

export function toReactiveContentObservable(
  input: IToReactiveContentInput,
): IReactiveContent {
  return mapObservable<IToReactiveContentValue, IDocumentFragmentOrNull>(
    toObservableThrowIfUndefined(input),
    (value: IToReactiveContentValue): IDocumentFragmentOrNull => {
      if (value === null) {
        return null;
      } else if (typeof value === 'string') {
        const fragment: DocumentFragment = createDocumentFragment();
        nodeAppendChild(fragment, createTextNode(value));
        return fragment;
      } else if (isDOMNode(value) && isDocumentFragment(value)) {
        return value;
      } else {
        throw new Error(`Invalid toReactiveContent value`);
      }
    },
  );
}


