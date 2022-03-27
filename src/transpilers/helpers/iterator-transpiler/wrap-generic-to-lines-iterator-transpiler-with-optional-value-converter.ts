import { ILinesOrNull } from '../../types/lines.type';
import { IToLinesTranspiler } from '../../types/to-lines.transpiler.type';

export interface IOptionalValueConverter<GIn, GOut> {
  (value: GIn): GOut | null;
}

export function wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<GIn, GOut, GArgument extends any[]>(
  transpiler: IToLinesTranspiler<[GOut, ...GArgument]>,
  converter: IOptionalValueConverter<GIn, GOut>,
): IToLinesTranspiler<[GIn, ...GArgument]> {
  return (
    value: GIn,
    ...args: GArgument
  ): ILinesOrNull => {
    const _value: GOut | null = converter(value);
    return (_value === null)
      ? null
      : transpiler(_value, ...args);
  };
}
