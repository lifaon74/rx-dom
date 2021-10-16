import { ILinesOrNull } from '../../types/lines.type';
import { IToLinesTranspiler } from '../../types/to-lines.transpiler.type';

export interface IOptionalValueConverter<GIn, GOut> {
  (value: GIn): GOut | null;
}

export function wrapGenericToLinesIteratorTranspilerWithOptionalValueConverter<GIn, GOut>(
  transpiler: IToLinesTranspiler<[GOut]>,
  converter: IOptionalValueConverter<GIn, GOut>,
): IToLinesTranspiler<[GIn]> {
  return (
    value: GIn,
  ): ILinesOrNull => {
    const _value: GOut | null = converter(value);
    return (_value === null)
      ? null
      : transpiler(_value);
  };
}
