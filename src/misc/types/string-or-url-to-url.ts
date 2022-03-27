import { getBaseURI } from '../../light-dom/node/explore/get-base-uri';
import { IStringOrURL } from './string-or-url.type';

export function stringOrURLToURL(
  input: IStringOrURL,
): URL {
  return (typeof input === 'string')
    ? new URL(input, getBaseURI())
    : input;
}
