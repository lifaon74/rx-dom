const UUIDS = new Map<string, number>();

export function incrementalUUID(
  prefix: string,
): string {
  let count: number = UUIDS.get(prefix) ?? 0;
  UUIDS.set(prefix, count + 1);
  return `${ prefix }-${ count.toString(16) }`;
}
