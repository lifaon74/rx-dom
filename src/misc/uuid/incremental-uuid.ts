
export interface IIncrementalUUID {
  (): string;
}

export function createIncrementalUUID(
  prefix: string,
): IIncrementalUUID {
  let count: number = 0;
  return (): string => {
    return `${ prefix }-${ (count++).toString(16) }`;
  };
}
