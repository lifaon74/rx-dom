export function isCustomElementTagName<GName extends string>(
  value: string,
): value is GName {
  return value.includes('-');
}
