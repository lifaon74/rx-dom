import { ILinesOrNull } from '../../types/lines.type';
import { IToLinesTranspiler } from '../../types/to-lines.transpiler.type';

export function createGenericToLinesIteratorTranspiler<GArgument extends any[]>(
  transpilers: ArrayLike<IToLinesTranspiler<GArgument>>,
): IToLinesTranspiler<GArgument> {
  return (
    ...args: GArgument
  ): ILinesOrNull => {
    for (let i = 0, l = transpilers.length; i < l; i++) {
      const result: ILinesOrNull = transpilers[i](...args);
      if (result !== null) {
        return result;
      }
    }
    return null;
  };
}
