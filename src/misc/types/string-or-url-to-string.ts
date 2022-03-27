import { IStringOrURL } from './string-or-url.type';

export function stringOrURLToString(
  input: IStringOrURL,
): string {
  return (typeof input === 'string')
    ? input
    : input.href;
}
