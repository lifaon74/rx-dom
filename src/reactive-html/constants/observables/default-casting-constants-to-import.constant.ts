import { ISubscribeFunction, ISubscribePipeFunction, mapSubscribePipe, pipeSubscribeFunction, toNumber } from '@lifaon/rx-js-light';

function castToNumber(
  input: ISubscribeFunction<unknown>
): ISubscribeFunction<number> {
  return mapSubscribePipe(toNumber)(input);
}


function castToString(
  input: ISubscribeFunction<unknown>
): ISubscribeFunction<string> {
  return mapSubscribePipe(toString)(input);
}

export const DEFAULT_CASTING_CONSTANTS_TO_IMPORT = {
  toNumber,
  toString,
  castToNumber,
  castToString,
};



