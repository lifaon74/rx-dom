import { ILinesOrNull } from './lines.type';

export interface IToLinesTranspiler<GArgument extends any[]> {
  (...args: GArgument): ILinesOrNull;
}
