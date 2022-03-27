export interface IRequireExternalFunction<GKey extends string> {
  (name: GKey): string;
}
