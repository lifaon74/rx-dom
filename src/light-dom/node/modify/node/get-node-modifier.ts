export function getNodeModifier(
  name: string,
): never {
  throw new Error(`Missing node modifier: ${name}`);
}
